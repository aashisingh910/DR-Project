import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";


const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Ready to Transform Your Diabetic Retinopathy Screening?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
            Join thousands of healthcare professionals using our AI-powered platform to detect 
            diabetic retinopathy earlier and more accurately.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
         <Link to="/classify">
  <Button 
    size="xl" 
    variant="secondary"
    className="group shadow-xl hover:shadow-2xl"
  >
    Get Started Now
    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
  </Button>
</Link>
           <Link to="/contact">
  <Button 
    size="xl" 
    variant="outline"
    className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
  >
    <Mail className="w-5 h-5" />
    Contact Sales Team
  </Button>
</Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-primary-foreground/90">
            <div>
              <div className="text-3xl font-bold mb-2">24/7 Complete </div>
              <div className="text-sm">Expert Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">30 Days</div>
              <div className="text-sm">Money-Back Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Free Installation </div>
              <div className="text-sm">Setup & Training</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
