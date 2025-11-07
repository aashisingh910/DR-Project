import { Upload, Scan, FileCheck, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Image",
    description: "Securely upload fundus images in standard formats (JPEG, PNG, DICOM).",
  },
  {
    icon: Scan,
    title: "AI Analysis",
    description: "Our deep learning model analyzes retinal features and identifies abnormalities.",
  },
  {
    icon: FileCheck,
    title: "Review Results",
    description: "Get detailed reports with confidence scores and severity classifications.",
  },
  {
    icon: Download,
    title: "Export Report",
    description: "Download comprehensive reports for patient records and clinical review.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Fast, Accurate
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four easy steps to get reliable diabetic retinopathy detection results
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg relative z-10">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-30 animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
