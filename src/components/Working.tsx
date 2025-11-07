import { Upload, Scan, FileCheck, Download, BarChart3, Brain, Eye, Activity } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "1. Upload Image",
    description: "Securely upload fundus images in standard formats (JPEG, PNG, or DICOM). Each image is encrypted and processed anonymously.",
    stat: "100% HIPAA Compliant",
  },
  {
    icon: Scan,
    title: "2. AI Analysis",
    description: "Our deep learning model analyzes microaneurysms, hemorrhages, and exudates using convolutional neural networks (CNNs).",
    stat: "98.2% Sensitivity",
  },
  {
    icon: FileCheck,
    title: "3. Review Results",
    description: "View detailed visualizations — including lesion heatmaps, confidence scores, and DR stage predictions for each eye.",
    stat: "92% Diagnostic Accuracy",
  },
  {
    icon: Download,
    title: "4. Export Report",
    description: "Download AI-verified reports in PDF or HL7 format for EHR integration, clinical audits, and patient documentation.",
    stat: "Instant Report Generation",
  },
];

const classifications = [
  { level: "No DR", description: "No signs of retinopathy detected.", color: "text-green-500", percent: "35%" },
  { level: "Mild", description: "Microaneurysms present, early warning stage.", color: "text-yellow-400", percent: "25%" },
  { level: "Moderate", description: "Increased hemorrhages, possible macular edema.", color: "text-orange-400", percent: "20%" },
  { level: "Severe", description: "Widespread lesions, high-risk pre-proliferative stage.", color: "text-red-500", percent: "15%" },
  { level: "Proliferative (PDR)", description: "Neovascularization and severe retinal damage detected.", color: "text-pink-500", percent: "5%" },
];

const metrics = [
  { icon: BarChart3, value: "98.2%", label: "Detection Sensitivity" },
  { icon: Brain, value: "0.91", label: "AUC ROC Score" },
  { icon: Eye, value: "100K+", label: "Retinal Images Trained" },
  { icon: Activity, value: "< 5s", label: "Avg. Analysis Time" },
];

const HowItWorksPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-primary/10">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From image upload to clinical insights — experience the end-to-end power of AI in diabetic retinopathy detection.
          </p>

          {/* Eye anatomy diagram */}
          <div className="mt-10 flex justify-center">
            <img
              src="src/assets/5.png"
              alt="Eye Anatomy Diagram"
              className="max-w-2xl w-full rounded-xl shadow-lg border border-border"
            />
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-md text-center border border-border hover:shadow-xl transition">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <span className="text-sm text-primary font-medium">{step.stat}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Performance Metrics */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">AI Performance at a Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-3">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">{metric.value}</h3>
                  <p className="text-muted-foreground">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Classification Explanation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            AI-Driven Classification of Diabetic Retinopathy
          </h2>

          {/* Add DR stage diagram */}
          <div className="flex justify-center mb-12">
            <img
              src="src/assets/4.png"
              alt="DR Classification Stages"
              className="max-w-4xl w-full rounded-lg shadow-md border border-border"
            />
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {classifications.map((cls, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-md text-center border border-border">
                <h3 className={`text-xl font-bold mb-2 ${cls.color}`}>{cls.level}</h3>
                <p className="text-muted-foreground mb-2">{cls.description}</p>
                <div className={`text-lg font-semibold ${cls.color}`}>{cls.percent}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">What You Receive</h2>
            <p className="text-muted-foreground mb-10">
              Each AI-generated report includes:
            </p>
            <ul className="text-muted-foreground space-y-4">
              <li>✅ DR Stage classification (No DR → PDR)</li>
              <li>✅ Lesion heatmap overlay for explainability</li>
              <li>✅ Confidence scores and AI reasoning trace</li>
              <li>✅ Severity progression prediction (based on historical patterns)</li>
              <li>✅ Optional cloud backup and export in PDF/HL7</li>
            </ul>
          </div>

          {/* Add DR retina diagram */}
          <div className="flex justify-center">
            <img
              src="src/assets/3.jpg"
              alt="DR Retina Diagram"
              className="max-w-lg w-full rounded-2xl shadow-lg border border-border"
            />
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 text-center text-muted-foreground border-t border-border">
        <p>Empowering ophthalmologists and clinicians with AI-assisted precision care.</p>
      </section>
    </main>
  );
};

export default HowItWorksPage;
