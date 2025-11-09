// DRclassify.tsx - Complete Diabetic Retinopathy Classification Frontend
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Types
interface PatientInfo {
  name: string;
  email: string;
  age: string;
  diabetesDuration: string;
  gender: string;
}

interface AnalysisResult {
  stage: "No DR" | "Mild NPDR" | "Moderate NPDR" | "Severe NPDR" | "PDR";
  confidence: number;
  description: string;
  recommendations: string[];
  lesionCount: number;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    aucRoc: number;
  };
  processingTime: string;
  imageData: {
    original: string;
    enhanced: string;
    heatmap: string;
    segmentation: string;
    shap: string;
  };
}

interface ProcessingStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

const DRclassify = () => {
  // State management
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    email: '',
    age: '',
    diabetesDuration: '',
    gender: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'original' | 'enhanced' | 'heatmap' | 'segmentation' | 'shap'>('original');
  const reportRef = useRef<HTMLDivElement>(null);

  // Processing steps definition
  const processingSteps: ProcessingStep[] = [
    {
      id: 0,
      title: "Data Loading & Validation",
      description: "Loading fundus image and validating format/quality",
      status: 'pending'
    },
    {
      id: 1,
      title: "Preprocessing Pipeline",
      description: "MSR Retinex + CLAHE enhancement + Quality Control",
      status: 'pending'
    },
    {
      id: 2,
      title: "Data Augmentation",
      description: "AutoAugment + MixUp/CutMix techniques",
      status: 'pending'
    },
    {
      id: 3,
      title: "Class Imbalance Mitigation",
      description: "Generative methods + Strategic sampling + Focal loss",
      status: 'pending'
    },
    {
      id: 4,
      title: "U-Net Lesion Segmentation",
      description: "Multi-scale feature extraction + Mask generation",
      status: 'pending'
    },
    {
      id: 5,
      title: "EfficientNet-B4 + Attention",
      description: "Feature extraction + Attention mechanism",
      status: 'pending'
    },
    {
      id: 6,
      title: "LoRA Fine-tuning",
      description: "Parameter-efficient adaptation + Adapter optimization",
      status: 'pending'
    },
    {
      id: 7,
      title: "Explainable AI Analysis",
      description: "Grad-CAM++ + SHAP + LIME explanations",
      status: 'pending'
    },
    {
      id: 8,
      title: "Model Optimization",
      description: "Dynamic quantization + ONNX optimization",
      status: 'pending'
    },
    {
      id: 9,
      title: "Comprehensive Evaluation",
      description: "Metrics + Calibration + Subgroup analysis",
      status: 'pending'
    },
    {
      id: 10,
      title: "Report Generation",
      description: "Visualization + Clinical recommendations + PDF export",
      status: 'pending'
    }
  ];

  // File handling
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  // Patient info handling
  const updatePatientInfo = (field: keyof PatientInfo, value: string) => {
    setPatientInfo(prev => ({ ...prev, [field]: value }));
  };

  // Analysis pipeline
  const startAnalysis = async () => {
    if (!selectedFile || !patientInfo.name) {
      alert('Please provide patient information and upload a fundus image');
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(0);

    try {
      // Simulate the complete analysis pipeline
      for (let step = 0; step < processingSteps.length; step++) {
        setCurrentStep(step);
        
        // Simulate processing time for each step
        await new Promise(resolve => setTimeout(resolve, getStepDuration(step)));
        
        // Simulate API calls for key steps
        if ([1, 4, 5, 7, 9].includes(step)) {
          await simulateAPICall(step);
        }
      }

      // Generate mock results
      const results = generateMockResults();
      setAnalysisResult(results);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStepDuration = (step: number): number => {
    const durations = [800, 1200, 600, 800, 1500, 1200, 1000, 1800, 900, 1100, 700];
    return durations[step] || 800;
  };

  const simulateAPICall = async (step: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, 1200));
  };

  const generateMockResults = (): AnalysisResult => {
    const stages: AnalysisResult['stage'][] = ["No DR", "Mild NPDR", "Moderate NPDR", "Severe NPDR", "PDR"];
    const randomStage = stages[Math.floor(Math.random() * stages.length)];
    
    return {
      stage: randomStage,
      confidence: 0.85 + Math.random() * 0.12,
      description: getStageDescription(randomStage),
      recommendations: getRecommendations(randomStage),
      lesionCount: Math.floor(Math.random() * 45) + 5,
      metrics: {
        accuracy: 0.92 + Math.random() * 0.05,
        precision: 0.89 + Math.random() * 0.08,
        recall: 0.91 + Math.random() * 0.06,
        f1Score: 0.90 + Math.random() * 0.05,
        aucRoc: 0.94 + Math.random() * 0.04
      },
      processingTime: `${2.3 + Math.random() * 1.5}s`,
      imageData: {
        original: imagePreview || '/api/placeholder/400/300',
        enhanced: '/api/placeholder/400/300?color=blue',
        heatmap: '/api/placeholder/400/300?color=red',
        segmentation: '/api/placeholder/400/300?color=green',
        shap: '/api/placeholder/400/300?color=purple'
      }
    };
  };

  // PDF Report Generation
  const generatePDFReport = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, { 
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${patientInfo.name}_DR_Analysis_Report.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF report');
    }
  };

  // Helper functions
  const getStageDescription = (stage: string): string => {
    const descriptions = {
      "No DR": "No signs of diabetic retinopathy detected. Retinal structure appears normal with no microaneurysms, hemorrhages, or exudates present.",
      "Mild NPDR": "Early non-proliferative diabetic retinopathy with presence of microaneurysms. Mild stage requiring regular monitoring and optimized diabetes management.",
      "Moderate NPDR": "Moderate non-proliferative stage with multiple microaneurysms, dot/blot hemorrhages, and hard exudates detected. Specialist referral recommended.",
      "Severe NPDR": "Severe non-proliferative diabetic retinopathy with venous beading, intraretinal microvascular abnormalities (IRMA), and extensive hemorrhages in multiple quadrants.",
      "PDR": "Proliferative diabetic retinopathy with neovascularization detected. High risk of vision loss requiring immediate specialist intervention and possible laser treatment."
    };
    return descriptions[stage as keyof typeof descriptions] || "Analysis complete.";
  };

  const getRecommendations = (stage: string): string[] => {
    const recommendations = {
      "No DR": [
        "Continue annual diabetic eye screening",
        "Maintain good glycemic control (HbA1c < 7%)",
        "Regular health checkups and lifestyle maintenance",
        "Monitor blood pressure and cholesterol levels"
      ],
      "Mild NPDR": [
        "Follow-up eye examination in 6-12 months",
        "Optimize blood glucose management",
        "Consider nutritional counseling",
        "Monitor for progression of symptoms"
      ],
      "Moderate NPDR": [
        "Refer to ophthalmologist for comprehensive evaluation",
        "Consider optical coherence tomography (OCT)",
        "Follow-up in 3-6 months recommended",
        "Intensify glycemic control measures"
      ],
      "Severe NPDR": [
        "Urgent ophthalmology referral required",
        "High risk of progression to proliferative DR",
        "Consider early intervention with pan-retinal photocoagulation",
        "Close monitoring every 1-2 months essential"
      ],
      "PDR": [
        "Immediate retina specialist care required",
        "Pan-retinal photocoagulation likely needed",
        "Anti-VEGF therapy may be considered",
        "Regular monitoring every 1-2 months",
        "High risk of vitreous hemorrhage and retinal detachment"
      ]
    };
    return recommendations[stage as keyof typeof recommendations] || [];
  };

  const getStageColor = (stage: string): string => {
    const colors = {
      "No DR": "text-green-600 bg-green-100",
      "Mild NPDR": "text-yellow-600 bg-yellow-100",
      "Moderate NPDR": "text-orange-600 bg-orange-100", 
      "Severe NPDR": "text-red-600 bg-red-100",
      "PDR": "text-red-800 bg-red-200"
    };
    return colors[stage as keyof typeof colors] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Diabetic Retinopathy Classifier
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Advanced AI-powered analysis using EfficientNet-B4 with LoRA fine-tuning, 
            MultiScale Retinex preprocessing, and comprehensive explainable AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Controls & Progress */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Patient Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientInfo.name}
                    onChange={(e) => updatePatientInfo('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter patient name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={patientInfo.email}
                    onChange={(e) => updatePatientInfo('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="patient@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      value={patientInfo.age}
                      onChange={(e) => updatePatientInfo('age', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diabetes (yrs)
                    </label>
                    <input
                      type="text"
                      value={patientInfo.diabetesDuration}
                      onChange={(e) => updatePatientInfo('diabetesDuration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Duration"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={patientInfo.gender}
                    onChange={(e) => updatePatientInfo('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* File Upload Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Fundus Image Upload</h3>
              
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {selectedFile ? selectedFile.name : 'Click or drag fundus image'}
                  </p>
                  <p className="text-xs text-gray-500">Supports JPG, PNG, JPEG • Max 10MB</p>
                </div>
              </div>

              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4"
                >
                  <img
                    src={imagePreview}
                    alt="Fundus preview"
                    className="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                </motion.div>
              )}

              <button
                onClick={startAnalysis}
                disabled={!selectedFile || !patientInfo.name || isAnalyzing}
                className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold transition-all ${
                  selectedFile && patientInfo.name && !isAnalyzing
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAnalyzing ? 'Processing...' : 'Start Analysis'}
              </button>
            </motion.div>

            {/* Progress Overview */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Progress</h3>
                
                <div className="space-y-3">
                  {processingSteps.slice(0, currentStep + 3).map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        step.id < currentStep 
                          ? 'bg-green-100 text-green-600' 
                          : step.id === currentStep
                          ? 'bg-blue-100 text-blue-600 animate-pulse'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.id < currentStep ? '✓' : step.id + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          step.id <= currentStep ? 'text-gray-800' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </p>
                        {step.id === currentStep && (
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: getStepDuration(step.id) / 1000 }}
                            className="h-1 bg-blue-200 rounded-full mt-1 overflow-hidden"
                          >
                            <motion.div
                              className="h-full bg-blue-600 rounded-full"
                              animate={{ x: ['0%', '100%'] }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Overall Progress</span>
                    <span>{Math.round((currentStep / (processingSteps.length - 1)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(currentStep / (processingSteps.length - 1)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!isAnalyzing && !analysisResult && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center"
                >
                  <div className="max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Diabetic Retinopathy Analysis Pipeline
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Upload a fundus image to start the comprehensive AI analysis pipeline featuring 
                      advanced preprocessing, deep learning classification, and explainable AI insights.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800">Technical Features:</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• MultiScale Retinex + CLAHE preprocessing</li>
                          <li>• EfficientNet-B4 with attention mechanism</li>
                          <li>• LoRA parameter-efficient fine-tuning</li>
                          <li>• U-Net lesion segmentation</li>
                          <li>• Grad-CAM++ + SHAP + LIME explanations</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800">Clinical Outputs:</h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• DR stage classification (5 categories)</li>
                          <li>• Lesion detection and quantification</li>
                          <li>• Confidence scores and metrics</li>
                          <li>• Clinical recommendations</li>
                          <li>• Comprehensive PDF reports</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {processingSteps[currentStep]?.title}
                    </h2>
                    <p className="text-gray-600">
                      {processingSteps[currentStep]?.description}
                    </p>
                  </div>

                  {/* Current Step Visualization */}
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-800 mb-3">Current Process:</h3>
                      <div className="space-y-2">
                        {getStepDetails(currentStep).map((detail, index) => (
                          <motion.div
                            key={detail}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center space-x-2 text-sm text-gray-700"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, delay: index * 0.3, repeat: Infinity }}
                              className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                            />
                            <span>{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {analysisResult && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  ref={reportRef}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Results Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Diabetic Retinopathy Analysis Report</h2>
                        <p className="text-blue-100">Comprehensive AI-powered assessment with explainable insights</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-200">Processed in {analysisResult.processingTime}</p>
                        <p className="text-xs text-blue-200">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Patient & Results Summary */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
                        <div className="space-y-2">
                          <p><strong>Name:</strong> {patientInfo.name}</p>
                          <p><strong>Email:</strong> {patientInfo.email || 'Not provided'}</p>
                          <p><strong>Age:</strong> {patientInfo.age || 'Not provided'}</p>
                          <p><strong>Diabetes Duration:</strong> {patientInfo.diabetesDuration || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Diagnosis Results</h3>
                        <div className="space-y-3">
                          <div className={`inline-flex items-center px-4 py-2 rounded-full ${getStageColor(analysisResult.stage)}`}>
                            <span className="font-semibold">{analysisResult.stage}</span>
                          </div>
                          <p><strong>Confidence:</strong> {(analysisResult.confidence * 100).toFixed(1)}%</p>
                          <p><strong>Lesions Detected:</strong> {analysisResult.lesionCount}</p>
                          <p><strong>Processing Time:</strong> {analysisResult.processingTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* Image Visualization Tabs */}
                    <div className="mb-8">
                      <div className="flex space-x-1 mb-4">
                        {['original', 'enhanced', 'heatmap', 'segmentation', 'shap'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                              activeTab === tab
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="relative">
                          <img
                            src={analysisResult.imageData[activeTab]}
                            alt={`${activeTab} view`}
                            className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                          />
                          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                            {activeTab.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Clinical Assessment */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Clinical Assessment</h3>
                        <p className="text-gray-700 mb-4">{analysisResult.description}</p>
                        
                        <h4 className="font-semibold text-gray-800 mb-2">Recommendations</h4>
                        <ul className="space-y-2 text-gray-700">
                          {analysisResult.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Performance Metrics */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Model Performance</h3>
                        <div className="space-y-3">
                          {Object.entries(analysisResult.metrics).map(([metric, value]) => (
                            <div key={metric} className="flex justify-between items-center">
                              <span className="capitalize text-gray-700">{metric.replace(/([A-Z])/g, ' $1')}:</span>
                              <span className="font-semibold">{(value * 100).toFixed(1)}%</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Technical Details</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• EfficientNet-B4 with LoRA fine-tuning</li>
                            <li>• MultiScale Retinex preprocessing</li>
                            <li>• U-Net lesion segmentation</li>
                            <li>• Grad-CAM++ + SHAP + LIME XAI</li>
                            <li>• Dynamic quantization optimized</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={generatePDFReport}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF Report
                      </button>
                      
                      <button
                        onClick={() => {
                          setAnalysisResult(null);
                          setSelectedFile(null);
                          setImagePreview(null);
                          setCurrentStep(0);
                        }}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        New Analysis
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper function for step details
  function getStepDetails(step: number): string[] {
    const details = {
      0: ["Loading DICOM/JPEG metadata", "Validating image quality standards", "Checking resolution requirements", "Verifying file integrity"],
      1: ["MSR illumination correction", "CLAHE contrast enhancement", "Noise reduction filtering", "Quality control validation"],
      2: ["AutoAugment policy application", "MixUp sample interpolation", "CutMix region replacement", "Geometric transformations"],
      3: ["Generative adversarial networks", "Strategic minority oversampling", "Focal loss application", "Class weight balancing"],
      4: ["Encoder feature extraction", "Decoder mask generation", "Lesion boundary detection", "Multi-scale analysis"],
      5: ["EfficientNet-B4 backbone", "Attention mechanism activation", "Feature pyramid network", "Global context aggregation"],
      6: ["LoRA adapter injection", "Parameter-efficient training", "Gradient checkpointing", "Adapter weight optimization"],
      7: ["Grad-CAM++ heatmap generation", "SHAP value computation", "LIME local explanations", "Feature importance analysis"],
      8: ["Dynamic quantization", "ONNX runtime optimization", "Memory usage optimization", "Inference speed optimization"],
      9: ["Multi-class metrics calculation", "Calibration curve analysis", "Subgroup performance evaluation", "Confidence interval computation"],
      10: ["Visualization compilation", "Clinical recommendation generation", "PDF report assembly", "Quality assurance check"]
    };
    return details[step as keyof typeof details] || ["Processing...", "Applying AI algorithms", "Generating insights"];
  }
};

export default DRclassify;