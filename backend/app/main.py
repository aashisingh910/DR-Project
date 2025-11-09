# backend/app/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import torch.nn as nn
from torchvision import transforms
import cv2
import numpy as np
from PIL import Image
import io
import base64
from typing import Dict, List
import json

# Import your custom modules
from .models.efficientnet_lora import EfficientNetB4LoRA
from .preprocessing.retinex import MultiScaleRetinex
from .segmentation.unet import UNetSegmentation
from .xai.gradcam import GradCAMPlusPlus
from .xai.shap_lime import SHAPLimeExplainer

app = FastAPI(title="Diabetic Retinopathy API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = None
preprocessor = None
segmenter = None
gradcam = None
shap_lime = None

class_names = ['No DR', 'Mild NPDR', 'Moderate NPDR', 'Severe NPDR', 'PDR']

@app.on_event("startup")
async def load_models():
    """Load all models on startup"""
    global model, preprocessor, segmenter, gradcam, shap_lime
    
    print("🚀 Loading Diabetic Retinopathy Models...")
    
    # Load pre-trained models
    model = EfficientNetB4LoRA(num_classes=5)
    model.load_state_dict(torch.load('models/efficientnet_b4_lora.pth', map_location=device))
    model.to(device)
    model.eval()
    
    preprocessor = MultiScaleRetinex()
    segmenter = UNetSegmentation()
    segmenter.load_state_dict(torch.load('models/unet_segmenter.pth', map_location=device))
    segmenter.to(device)
    segmenter.eval()
    
    gradcam = GradCAMPlusPlus(model, model.layer4)
    shap_lime = SHAPLimeExplainer(model)
    
    print("✅ All models loaded successfully!")

def preprocess_image(image: Image.Image) -> torch.Tensor:
    """Preprocess image for model inference"""
    transform = transforms.Compose([
        transforms.Resize((380, 380)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    return transform(image).unsqueeze(0)

def enhance_image(image: np.ndarray) -> np.ndarray:
    """Apply MultiScale Retinex enhancement"""
    return preprocessor.multi_scale_retinex(image)

def segment_lesions(image: np.ndarray) -> Dict:
    """Segment lesions using U-Net"""
    with torch.no_grad():
        input_tensor = torch.from_numpy(image).permute(2, 0, 1).unsqueeze(0).float()
        segmentation = segmenter(input_tensor)
        mask = (segmentation.squeeze() > 0.5).numpy().astype(np.uint8)
    
    return {
        'mask': mask,
        'lesion_count': np.sum(mask),
        'lesion_areas': cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]
    }

@app.post("/api/analyze")
async def analyze_dr_image(
    file: UploadFile = File(...),
    patient_name: str = "",
    email: str = ""
):
    """Main analysis endpoint"""
    try:
        # Read and validate image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # Convert to numpy for preprocessing
        image_np = np.array(image)
        
        # Step 1: MultiScale Retinex Enhancement
        enhanced_image = enhance_image(image_np)
        
        # Step 2: U-Net Lesion Segmentation
        segmentation_result = segment_lesions(enhanced_image)
        
        # Step 3: Model Prediction
        input_tensor = preprocess_image(Image.fromarray(enhanced_image)).to(device)
        
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted_class = torch.max(probabilities, 1)
        
        predicted_class = predicted_class.item()
        confidence = confidence.item()
        
        # Step 4: XAI Explanations
        gradcam_heatmap = gradcam.generate(input_tensor, predicted_class)
        shap_explanation = shap_lime.explain(input_tensor)
        
        # Step 5: Generate recommendations
        recommendations = get_recommendations(predicted_class, confidence)
        
        # Convert images to base64 for frontend
        enhanced_b64 = image_to_base64(Image.fromarray(enhanced_image))
        heatmap_b64 = image_to_base64(gradcam_heatmap)
        
        response = {
            "success": True,
            "analysis": {
                "stage": class_names[predicted_class],
                "confidence": confidence,
                "description": get_stage_description(predicted_class),
                "recommendations": recommendations,
                "lesion_count": int(segmentation_result['lesion_count']),
                "image_data": {
                    "original": image_to_base64(image),
                    "enhanced": enhanced_b64,
                    "heatmap": heatmap_b64,
                    "segmentation": image_to_base64(
                        overlay_segmentation(image_np, segmentation_result['mask'])
                    )
                },
                "patient_info": {
                    "name": patient_name,
                    "email": email
                }
            }
        }
        
        return JSONResponse(content=response)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "models_loaded": model is not None,
        "device": str(device)
    }

def get_recommendations(stage: int, confidence: float) -> List[str]:
    """Get clinical recommendations based on DR stage"""
    recommendations = {
        0: [  # No DR
            "Maintain good glycemic control (HbA1c < 7%)",
            "Annual diabetic eye screening recommended",
            "Continue regular health checkups"
        ],
        1: [  # Mild NPDR
            "Optimize blood glucose management",
            "Follow-up in 6-12 months",
            "Monitor blood pressure and cholesterol"
        ],
        2: [  # Moderate NPDR
            "Refer to ophthalmologist",
            "Consider optical coherence tomography",
            "Follow-up in 3-6 months"
        ],
        3: [  # Severe NPDR
            "Urgent ophthalmology referral",
            "High risk of progression to PDR",
            "Consider early intervention"
        ],
        4: [  # PDR
            "Immediate specialist care required",
            "Pan-retinal photocoagulation likely needed",
            "Regular monitoring every 1-2 months"
        ]
    }
    
    return recommendations.get(stage, recommendations[0])

def get_stage_description(stage: int) -> str:
    """Get description for each DR stage"""
    descriptions = {
        0: "No signs of diabetic retinopathy detected. Retina appears healthy.",
        1: "Microaneurysms present indicating early non-proliferative diabetic retinopathy.",
        2: "Multiple microaneurysms, hemorrhages, and exudates detected.",
        3: "Severe non-proliferative stage with venous beading and intraretinal microvascular abnormalities.",
        4: "Proliferative diabetic retinopathy with neovascularization detected."
    }
    return descriptions.get(stage, "Analysis complete.")

def image_to_base64(image: Image.Image) -> str:
    """Convert PIL image to base64 string"""
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

def overlay_segmentation(image: np.ndarray, mask: np.ndarray) -> Image.Image:
    """Overlay segmentation mask on original image"""
    overlay = image.copy()
    overlay[mask == 1] = [255, 0, 0]  # Red overlay for lesions
    return Image.fromarray(overlay)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)