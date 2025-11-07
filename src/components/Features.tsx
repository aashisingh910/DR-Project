import { Brain, LineChart, Lock, Microscope, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Deep Learning AI",
    description: "Advanced neural networks trained on millions of fundus images for superior accuracy and reliability.",
  },
  {
    icon: Shield,
    title: "Clinical Validation",
    description: "FDA-compliant framework validated through rigorous clinical trials and peer-reviewed research.",
  },
  {
    icon: Zap,
    title: "Rapid Analysis",
    description: "Get comprehensive results in under 2 minutes without compromising on accuracy or detail.",
  },
  {
    icon: Microscope,
    title: "Multi-Stage Detection",
    description: "Identifies all stages of diabetic retinopathy from mild to proliferative with confidence scores.",
  },
  {
    icon: LineChart,
    title: "Trend Analysis",
    description: "Track patient progression over time with detailed analytics and longitudinal comparisons.",
  },
  {
    icon: Lock,
    title: "AI Automation & Security",
    description: "Enterprise-grade security with end-to-end encryption ensuring complete patient data protection.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted AI Technology for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Healthcare Professionals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our robust framework combines cutting-edge AI with clinical expertise to deliver 
            reliable diabetic retinopathy detection you can trust.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="mb-4 p-3 bg-primary/10 rounded-xl inline-block group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
