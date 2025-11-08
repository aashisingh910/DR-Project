import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Upload, Sliders, FileText, Eye, Stethoscope } from "lucide-react";

// ✅ Import images (place in src/assets/)
import rawImg from "@/assets/diabetic9.jpg";
import processedImg from "@/assets/diabetic5.jpg";
import deviceImg from "@/assets/device.png";
import heatmapImg from "@/assets/heatmap.jpg";
import heatmap1Img from "@/assets/heatmap1.jpg";
import reportImg from "@/assets/pdf.png";

export default function ExplainableAIModelWithImages() {
  const steps = [
    {
      id: 1,
      title: "Step 1 — Image Upload & Collection",
      icon: <Upload className="w-8 h-8 text-blue-500" />,
      desc:
        "You upload a retinal (fundus) image from your device or clinic camera. The system ensures privacy, removes identifying metadata, and prepares it for analysis.",
      output: "Image securely stored and queued for preprocessing.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={deviceImg}
            alt="Fundus camera"
            className="w-48 h-48 object-contain rounded-xl shadow-lg"
          />
          <div className="mt-3 text-sm text-gray-600">Fundus-on-phone device</div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Step 2 — Preprocessing & Quality Enhancement",
      icon: <Sliders className="w-8 h-8 text-purple-500" />,
      desc:
        "We standardize image size, enhance contrast (CLAHE), and remove noise to ensure clarity before feeding into the model.",
      output: "A clear, normalized image ready for deep learning.",
      visual: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <div className="text-center">
            <img
              src={rawImg}
              alt="Raw fundus"
              className="w-44 h-44 object-cover rounded-lg shadow"
            />
            <div className="mt-2 text-sm text-gray-600">Raw uploaded image</div>
          </div>
          <div className="text-center">
            <img
              src={processedImg}
              alt="Processed fundus"
              className="w-44 h-44 object-cover rounded-lg shadow"
            />
            <div className="mt-2 text-sm text-gray-600">After enhancement (CLAHE, denoise)</div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Step 3 — Deep Learning Analysis",
      icon: <Brain className="w-8 h-8 text-pink-500" />,
      desc:
        "A CNN-based model (EfficientNet/ResNet) analyzes key retinal regions, detecting microaneurysms, hemorrhages, and exudates.",
      output: "Model predicts DR severity level (No DR → Proliferative DR) with confidence score.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={heatmapImg}
            alt="Model analysis heatmap"
            className="w-56 h-56 object-cover rounded-lg shadow"
          />
          <div className="mt-3 text-sm text-gray-600">
            Deep learning feature detection
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Step 4 — Explainable AI Interpretation",
      icon: <Eye className="w-8 h-8 text-green-500" />,
      desc:
        "Grad-CAM and SHAP visualizations highlight the exact retinal regions that influenced the model’s decision, allowing interpretability and trust.",
      output: "Color overlay heatmap showing clinically relevant attention zones.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={heatmap1Img}
            alt="Explainable AI heatmap"
            className="w-56 h-56 object-cover rounded-lg shadow"
          />
          <div className="mt-3 text-sm text-gray-600">
            Grad-CAM visualization overlay
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Step 5 — Result Analysis & Doctor Recommendation",
      icon: <Stethoscope className="w-8 h-8 text-red-500" />,
      desc:
        "The AI findings are correlated with clinical data to generate a summary report. Doctors review the visual explanation and provide personalized recommendations.",
      output: "Expert-reviewed summary and next-step medical advice.",
      visual: (
        <div className="flex flex-col items-center">
          <div className="w-52 rounded-xl bg-white border flex items-center justify-center shadow p-4">
            <div className="text-sm text-gray-700 text-center">
              Doctor’s Recommendation<br />✔ Review in 6 months<br />✔ Maintain blood sugar levels
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Step 6 — Report Generation & Suggested Treatment",
      icon: <FileText className="w-8 h-8 text-yellow-500" />,
      desc:
        "A comprehensive PDF report is generated, summarizing model predictions, Grad-CAM visualization, and doctor’s remarks with suggested treatment options.",
      output: "Downloadable patient report (PDF) with treatment recommendations.",
      visual: (
        <div className="flex flex-col items-center">
             <img
            src={reportImg}
            alt="Explainable AI heatmap"
            className="w-56 h-56 object-cover rounded-lg shadow"
          />
          
          <div className="mt-3 text-sm text-gray-600">Downloadable patient report</div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Explainable AI — Diabetic Retinopathy Workflow
        </motion.h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          This step-by-step Explainable AI pipeline transforms retinal images into clinically interpretable diagnostic insights, ensuring both transparency and trust.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            className="flex flex-col md:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <Card className="flex-1 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="pt-1">{step.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 mt-2">{step.desc}</p>
                    <div className="bg-gray-50 p-3 rounded-lg mt-4 text-sm text-gray-700">
                      <strong>Output:</strong> {step.output}
                    </div>
                    <div className="mt-4">
                      <Progress value={(step.id / steps.length) * 100} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visuals beside step */}
            <div className="w-full md:w-72 flex-shrink-0">
              <Card className="rounded-xl shadow-sm">
                <CardContent className="p-4 flex items-center justify-center">
                  {step.visual}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-center mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h4 className="text-2xl font-bold text-gray-800 mb-3">Try it on your own image!</h4>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Upload a retinal image to see the model’s prediction, confidence level, and Grad-CAM explanation — instantly.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" onClick={() => (window.location.href = "/classify")}>
            Upload Image
          </Button>
          <Button variant="ghost" size="lg" onClick={() => (window.location.href = "/dashboard")}>
            View Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
