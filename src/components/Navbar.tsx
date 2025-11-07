import { Button } from "@/components/ui/button";
import { Eye, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold">Diabetic Retinopathy AI</span>
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/')} className="text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => navigate('/classify')} className="text-foreground hover:text-primary transition-colors">
              Analysis
            </button>
            <button onClick={() => navigate('/dashboard')} className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </button>
            <button onClick={() => navigate('/study1')} className="text-foreground hover:text-primary transition-colors">
              Features
            </button>
            <button onClick={() => navigate('/Working')} className="text-foreground hover:text-primary transition-colors">
              Working
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/sign-in')}>Sign In</Button>
            <Button variant="default" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </div>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button onClick={() => { navigate('/'); setIsOpen(false); }} className="text-foreground hover:text-primary transition-colors text-left">
                Home
              </button>
              <button onClick={() => { navigate('/analysis'); setIsOpen(false); }} className="text-foreground hover:text-primary transition-colors text-left">
                Analysis
              </button>
              <button onClick={() => { navigate('/dashboard'); setIsOpen(false); }} className="text-foreground hover:text-primary transition-colors text-left">
                Dashboard
              </button>
              <button onClick={() => { navigate('/study1'); setIsOpen(false); }} className="text-foreground hover:text-primary transition-colors text-left">
                Features
              </button>
              <button onClick={() => { navigate('/how-it-works'); setIsOpen(false); }} className="text-foreground hover:text-primary transition-colors text-left">
                How It Works
              </button>
              
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" className="w-full" onClick={() => { navigate('/sign-in'); setIsOpen(false); }}>Sign In</Button>
                <Button variant="default" className="w-full" onClick={() => { navigate('/contact'); setIsOpen(false); }}>
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
