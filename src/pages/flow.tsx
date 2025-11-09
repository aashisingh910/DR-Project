import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Sliders, 
  Layers, 
  Scale, 
  Eye, 
  Brain, 
  Network, 
  Zap, 
  BarChart3, 
  FileText,
  Download,
  Cpu
} from "lucide-react";

// Import images (you'll need to add these to your assets folder)
import rawImg from "@/assets/device.png";
import processedImg from "@/assets/diabetic5.jpg";
import augmentationImg from "@/assets/heatmap.jpg";
import segmentationImg from "@/assets/heatmap1.jpg";
import modelImg from "@/assets/down.png";
import loraImg from "@/assets/diabetic10.jpg";
import explainabilityImg from "@/assets/download.png";
import optimizationImg from "@/assets/download (1).png";
import evaluationImg from "@/assets/eval.png";
import reportImg from "@/assets/pdf.png";

export default function WorkingModel() {
  const steps = [
    {
      id: 1,
      title: "1. Data Loading & Input",
      icon: <Upload className="w-6 h-6 text-blue-500" />,
      desc: "Load retinal fundus images from various sources including clinical cameras, mobile devices, or uploaded files. Supports multiple formats with automatic validation.",
      output: "Validated retinal images ready for preprocessing pipeline.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={rawImg}
            alt="Raw fundus image"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">Raw uploaded fundus image</div>
        </div>
      ),
    },
    {
      id: 2,
      title: "2. Preprocessing Pipeline",
      icon: <Sliders className="w-6 h-6 text-purple-500" />,
      desc: "Apply MSR Retinex for illumination correction, CLAHE for contrast enhancement, and quality control checks to ensure diagnostic suitability.",
      output: "Enhanced, standardized images with improved feature visibility.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={processedImg}
            alt="Processed image"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">After MSR Retinex + CLAHE</div>
        </div>
      ),
    },
    {
      id: 3,
      title: "2b. Data Augmentation",
      icon: <Layers className="w-6 h-6 text-green-500" />,
      desc: "Employ AutoAugment policies specifically tuned for medical images, along with MixUp and CutMix techniques to increase dataset diversity.",
      output: "Augmented training dataset with improved generalization capability.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={augmentationImg}
            alt="Augmentation examples"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">AutoAugment + MixUp/CutMix</div>
        </div>
      ),
    },
    {
      id: 4,
      title: "3. Class Imbalance Mitigation",
      icon: <Scale className="w-6 h-6 text-orange-500" />,
      desc: "Combine generative approaches (GANs), strategic sampling techniques, and specialized loss functions to handle rare DR stages effectively.",
      output: "Balanced training distribution across all DR severity classes.",
      visual: (
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-gradient-to-br from-orange-100 to-orange-300 rounded-lg shadow border flex items-center justify-center">
            <div className="text-center p-2">
              <div className="font-semibold text-orange-800">Class Balance</div>
              <div className="text-xs text-orange-700 mt-1">No DR → PDR</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600 text-center">Balanced class distribution</div>
        </div>
      ),
    },
    {
      id: 5,
      title: "4. U-Net Lesion Segmentation",
      icon: <Eye className="w-6 h-6 text-red-500" />,
      desc: "Optional segmentation mask generation to identify microaneurysms, hemorrhages, and exudates using U-Net architecture with skip connections.",
      output: "Precise lesion localization maps for detailed analysis.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={segmentationImg}
            alt="Segmentation masks"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">Lesion segmentation masks</div>
        </div>
      ),
    },
    {
      id: 6,
      title: "5. EfficientNet-B4 + Attention",
      icon: <Brain className="w-6 h-6 text-pink-500" />,
      desc: "Leverage EfficientNet-B4 backbone for feature extraction with added attention mechanisms to focus on clinically relevant regions.",
      output: "High-level feature representations with spatial attention weights.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={modelImg}
            alt="Model architecture"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">EfficientNet-B4 + Attention</div>
        </div>
      ),
    },
    {
      id: 7,
      title: "6. LoRA Adapters",
      icon: <Network className="w-6 h-6 text-indigo-500" />,
      desc: "Implement Parameter-Efficient Fine-Tuning using LoRA adapters for rapid adaptation to new data distributions without full model retraining.",
      output: "Efficiently fine-tuned model with minimal parameter updates.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={loraImg}
            alt="LoRA adapters"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">LoRA parameter-efficient tuning</div>
        </div>
      ),
    },
    {
      id: 8,
      title: "7. Explainability Methods",
      icon: <Cpu className="w-6 h-6 text-teal-500" />,
      desc: "Generate model explanations using Grad-CAM++, SHAP, and LIME to highlight decision-influencing regions and build clinician trust.",
      output: "Visual explanations and feature importance scores.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={explainabilityImg}
            alt="Explainability heatmaps"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">Grad-CAM++ & SHAP visualizations</div>
        </div>
      ),
    },
    {
      id: 9,
      title: "8. Post-Training Optimization",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      desc: "Apply dynamic quantization and export to ONNX format for optimized inference speed and deployment across various platforms.",
      output: "Optimized model ready for production deployment.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={optimizationImg}
            alt="Optimization"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">Quantization + ONNX export</div>
        </div>
      ),
    },
    {
      id: 10,
      title: "9. Comprehensive Evaluation",
      icon: <BarChart3 className="w-6 h-6 text-gray-600" />,
      desc: "Perform rigorous evaluation including metrics calculation, calibration analysis, and subgroup performance assessment across different patient demographics.",
      output: "Performance reports and model validation metrics.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={evaluationImg}
            alt="Evaluation metrics"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">Metrics & calibration analysis</div>
        </div>
      ),
    },
    {
      id: 11,
      title: "10. Visualization & Report Generation",
      icon: <FileText className="w-6 h-6 text-green-600" />,
      desc: "Generate comprehensive PDF reports with side-by-side comparisons, model predictions, confidence scores, and clinical recommendations.",
      output: "Downloadable patient report with treatment guidance.",
      visual: (
        <div className="flex flex-col items-center">
          <img
            src={reportImg}
            alt="Generated report"
            className="w-40 h-40 object-cover rounded-lg shadow border"
          />
          <div className="mt-2 text-xs text-gray-600 text-center">Comprehensive PDF report</div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Diabetic Retinopathy AI Pipeline
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            End-to-end explainable AI workflow for diabetic retinopathy screening, 
            from image acquisition to clinical report generation.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
            <h3 className="font-semibold text-blue-800 mb-2">Pipeline Overview</h3>
            <p className="text-sm text-blue-700">
              This comprehensive pipeline ensures robust, interpretable, and clinically actionable 
              diabetic retinopathy diagnosis through multiple stages of processing and validation.
            </p>
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col lg:flex-row gap-6 items-start"
            >
              {/* Step Content */}
              <Card className="flex-1 rounded-xl shadow-sm border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {step.title}
                        </h3>
                        <div className="flex-1 max-w-xs">
                          <Progress 
                            value={(step.id / steps.length) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Output:</span> {step.output}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Representation */}
              <div className="w-full lg:w-48 flex-shrink-0">
                <Card className="rounded-xl shadow-sm border">
                  <CardContent className="p-4 flex items-center justify-center min-h-[200px]">
                    {step.visual}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12 bg-white rounded-2xl shadow-sm border p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Ready to Experience the Pipeline?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Upload your retinal image to see the complete AI workflow in action - 
            from preprocessing to explainable diagnosis and comprehensive reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => (window.location.href = "/DRanalysis")}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Retinal Image
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => (window.location.href = "/dashboard")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={() => (window.location.href = "/patientDashboard")}
            >
              <FileText className="w-4 h-4 mr-2" />
              Technical Documentation
            </Button>
          </div>
        </motion.div>

        {/* Pipeline Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { label: "Processing Steps", value: "11" },
            { label: "Model Accuracy", value: "94.2%" },
            { label: "Processing Time", value: "< 30s" },
            { label: "DR Stages Detected", value: "5" },
          ].map((stat, idx) => (
            <Card key={idx} className="text-center p-6 rounded-xl">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}