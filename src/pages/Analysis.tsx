import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/analysis/ImageUpload";
import AnalysisResults from "@/components/analysis/AnalysisResults";

export interface AnalysisResult {
  severity: "No DR" | "Mild" | "Moderate" | "Severe" | "Proliferative";
  confidence: number;
  findings: string[];
  recommendations: string[];
  imageUrl: string;
  analyzedAt: Date;
}

const Analysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Generate mock results
    const severities: AnalysisResult["severity"][] = ["No DR", "Mild", "Moderate", "Severe", "Proliferative"];
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
    
    const findingsMap: Record<AnalysisResult["severity"], string[]> = {
      "No DR": [
        "No microaneurysms detected",
        "Normal optic disc appearance",
        "Clear macula without exudates",
        "Healthy blood vessel structure"
      ],
      "Mild": [
        "Few microaneurysms detected in temporal region",
        "Minor dot hemorrhages observed",
        "Optic disc appears normal",
        "No signs of macular edema"
      ],
      "Moderate": [
        "Multiple microaneurysms present",
        "Cotton wool spots detected",
        "Venous beading in one quadrant",
        "Hard exudates near macula"
      ],
      "Severe": [
        "Extensive microaneurysms throughout retina",
        "Significant intraretinal hemorrhages",
        "Venous beading in multiple quadrants",
        "Intraretinal microvascular abnormalities (IRMA)"
      ],
      "Proliferative": [
        "Neovascularization detected on disc (NVD)",
        "New vessels elsewhere (NVE) identified",
        "Vitreous hemorrhage present",
        "High risk of vision loss without treatment"
      ]
    };

    const recommendationsMap: Record<AnalysisResult["severity"], string[]> = {
      "No DR": [
        "Continue annual diabetic eye screenings",
        "Maintain optimal blood glucose control",
        "Monitor blood pressure regularly",
        "Next screening recommended in 12 months"
      ],
      "Mild": [
        "Schedule follow-up in 6-12 months",
        "Optimize diabetes management",
        "Monitor blood pressure and lipids",
        "Consider more frequent eye examinations"
      ],
      "Moderate": [
        "Referral to retina specialist recommended",
        "Follow-up within 3-6 months",
        "Strict glycemic control essential",
        "Consider fluorescein angiography"
      ],
      "Severe": [
        "Urgent referral to retina specialist required",
        "Panretinal photocoagulation may be indicated",
        "Follow-up within 1-2 months",
        "Aggressive diabetes management critical"
      ],
      "Proliferative": [
        "Immediate referral to retina specialist",
        "Panretinal photocoagulation strongly recommended",
        "Consider anti-VEGF therapy",
        "Monthly follow-up required"
      ]
    };

    const confidenceMap: Record<AnalysisResult["severity"], number> = {
      "No DR": 0.95 + Math.random() * 0.04,
      "Mild": 0.88 + Math.random() * 0.08,
      "Moderate": 0.85 + Math.random() * 0.10,
      "Severe": 0.90 + Math.random() * 0.08,
      "Proliferative": 0.92 + Math.random() * 0.06
    };

    setResult({
      severity: randomSeverity,
      confidence: confidenceMap[randomSeverity],
      findings: findingsMap[randomSeverity],
      recommendations: recommendationsMap[randomSeverity],
      imageUrl,
      analyzedAt: new Date()
    });

    setIsAnalyzing(false);
  };

  const handleReset = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3">Fundus Image Analysis</h1>
              <p className="text-muted-foreground text-lg">
                Upload a fundus image for AI-powered diabetic retinopathy detection
              </p>
            </div>

            {!uploadedImage && !isAnalyzing && !result && (
              <ImageUpload onUpload={handleImageUpload} />
            )}

            {(isAnalyzing || result) && (
              <AnalysisResults
                isAnalyzing={isAnalyzing}
                result={result}
                imageUrl={uploadedImage}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analysis;
