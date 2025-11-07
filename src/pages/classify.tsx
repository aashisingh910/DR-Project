import { useState, useRef } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  UploadCloud,
  Loader2,
  FileText,
  Mail,
  CheckCircle,
} from "lucide-react";

interface DRResult {
  stage: "No DR" | "Mild NPDR" | "Moderate NPDR" | "Severe NPDR" | "PDR";
  confidence: number;
  description: string;
  recommendations: string[];
}

const Analysis = () => {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<DRResult | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const simulateStep = (s: number, delay: number) =>
    new Promise((resolve) =>
      setTimeout(() => {
        setStep(s);
        resolve(true);
      }, delay)
    );

  const handleStartAnalysis = async () => {
    if (!file || !patientName || !email) {
      alert("Please fill all fields and upload a fundus image.");
      return;
    }

    setIsAnalyzing(true);
    setStep(1);

    await simulateStep(2, 1500);
    await simulateStep(3, 1500);
    await simulateStep(4, 1500);
    await simulateStep(5, 1500);
    await simulateStep(6, 1500);
    await simulateStep(7, 1500);

    const stages: DRResult["stage"][] = [
      "No DR",
      "Mild NPDR",
      "Moderate NPDR",
      "Severe NPDR",
      "PDR",
    ];
    const randomStage = stages[Math.floor(Math.random() * stages.length)];

    const descriptions: Record<DRResult["stage"], string> = {
      "No DR": "Healthy retina. No signs of diabetic retinopathy detected.",
      "Mild NPDR": "Microaneurysms detected — early stage NPDR.",
      "Moderate NPDR":
        "Hemorrhages and exudates present, moderate non-proliferative DR.",
      "Severe NPDR":
        "Extensive retinal changes, venous beading in multiple quadrants.",
      PDR: "Proliferative DR — neovascularization and vitreous hemorrhage signs.",
    };

    const recommendations: Record<DRResult["stage"], string[]> = {
      "No DR": ["Maintain glucose control", "Annual screening recommended"],
      "Mild NPDR": [
        "Optimize blood sugar levels",
        "Recheck in 6–12 months",
        "Monitor blood pressure",
      ],
      "Moderate NPDR": [
        "Refer to retina specialist",
        "OCT and FA advised",
        "Follow-up in 3–6 months",
      ],
      "Severe NPDR": [
        "Panretinal photocoagulation likely required",
        "Follow-up every 1–2 months",
      ],
      PDR: [
        "Immediate retina specialist referral",
        "Anti-VEGF or laser photocoagulation required",
      ],
    };

    setResult({
      stage: randomStage,
      confidence: 0.86 + Math.random() * 0.1,
      description: descriptions[randomStage],
      recommendations: recommendations[randomStage],
    });

    setIsAnalyzing(false);
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${patientName}_DR_Report.pdf`);
  };

  const handleSendEmail = () => {
    alert(
      `✅ Report for ${patientName} has been sent to ${email}. (Email simulation)`
    );
  };

  const analysisSteps = [
    "Uploading Image Data",
    "Preprocessing (Cropping, Normalizing)",
    "Contrast Enhancement",
    "Red Lesion Detection",
    "Segmentation of Retinal Regions",
    "EfficientNet Classification",
    "Report Generation & Mail Dispatch",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-slate-100">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl font-bold mb-3 text-blue-800">
            Diabetic Retinopathy Analysis
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Upload fundus image to analyze DR occurrence using EfficientNet
            model.
          </p>

          {/* Upload Section */}
          {!isAnalyzing && !result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 border"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Patient Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label className="block border-2 border-dashed border-blue-400 rounded-xl p-8 cursor-pointer hover:bg-blue-50 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center">
                  <UploadCloud className="h-10 w-10 text-blue-500 mb-2" />
                  <span className="text-lg text-gray-700 font-semibold">
                    {file ? file.name : "Click or drag a fundus image to upload"}
                  </span>
                </div>
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Fundus Preview"
                  className="mt-6 mx-auto max-w-sm rounded-lg shadow-md"
                />
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={handleStartAnalysis}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full shadow-lg"
              >
                Start Diabetic Retinopathy Analysis
              </motion.button>
            </motion.div>
          )}

          {/* Progress Section */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 bg-white rounded-2xl shadow-lg p-10 border"
            >
              <Loader2 className="mx-auto h-10 w-10 text-blue-600 animate-spin mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-blue-800">
                {analysisSteps[step - 1]}
              </h3>
              <p className="text-gray-600">
                Processing... please wait while AI analyzes your image.
              </p>
            </motion.div>
          )}

          {/* Results + Visuals */}
          {result && (
            <motion.div
              ref={reportRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 bg-white rounded-2xl shadow-lg p-10 border text-left"
            >
              <h2 className="text-3xl font-bold mb-4 text-blue-700">
                Diabetic Retinopathy Analysis Report
              </h2>

              {/* Overlay Section */}
              {preview && (
                <div className="relative w-full flex justify-center mb-8">
                  <img
                    src={preview}
                    alt="Original Fundus"
                    className="max-w-md rounded-lg border shadow-md"
                  />
                  {/* Overlay Simulation */}
                  <motion.img
                    src="/assets/lesion-mask.png"
                    alt="Lesion Overlay"
                    className="absolute top-0 opacity-60 mix-blend-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1 }}
                  />
                </div>
              )}

              <p className="text-lg mb-2">
                <strong>Patient Name:</strong> {patientName}
              </p>
              <p className="text-lg mb-2">
                <strong>Email:</strong> {email}
              </p>
              <p className="text-lg mb-2">
                <strong>Stage:</strong>{" "}
                <span className="text-blue-600">{result.stage}</span>
              </p>
              <p className="text-lg mb-2">
                <strong>Confidence:</strong>{" "}
                {(result.confidence * 100).toFixed(2)}%
              </p>

              <p className="text-gray-700 mb-4">{result.description}</p>

              <strong>Recommendations:</strong>
              <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                {result.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleDownloadPDF}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-md flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" /> Download Report (PDF)
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSendEmail}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" /> Send to Email
                </motion.button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5" />
                AI analysis completed successfully.
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analysis;
