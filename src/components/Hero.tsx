import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background to-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Automated Diabetic Retinopathy Detection AI Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Advanced AI for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Diabetic Retinopathy
              </span>{" "}
              Detection
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Our robust and trustworthy AI framework analyzes fundus images with clinical-grade accuracy, 
              helping healthcare professionals detect diabetic retinopathy earlier and more reliably.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => navigate('/analysis')}
              >
                Start Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 max-w-xl">
              <div className="text-center p-4 rounded-lg bg-card border border-border/50">
                <div className="text-3xl font-bold text-primary mb-1">98.5%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border/50">
                <div className="text-3xl font-bold text-primary mb-1">&lt;2min</div>
                <div className="text-sm text-muted-foreground">Analysis Time</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border/50">
                <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Scans</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <img 
              src={heroImage} 
              alt="Advanced retinal scanning technology with AI neural network overlay" 
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
            
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl animate-pulse-glow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-success/10 rounded-xl">
                  <Eye className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium">Real-time Detection</div>
                  <div className="text-xs text-muted-foreground">AI-Powered Analysis</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Fast Results</div>
                  <div className="text-xs text-muted-foreground">Under 2 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
