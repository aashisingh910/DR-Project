import { Button } from "@/components/ui/button";
import { Eye, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [isStudiesOpen, setIsStudiesOpen] = useState(false); // studies dropdown
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/introduction")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold">Diabetic Retinopathy AI</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/classify")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Analysis
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </button>

            {/* ✅ Studies Dropdown (hover only) */}
            <div
              className="relative inline-block text-left"
              onMouseEnter={() => setIsStudiesOpen(true)}
              onMouseLeave={() => setIsStudiesOpen(false)}
            >
              <button className="text-foreground hover:text-primary transition-colors">
                Studies ▾
              </button>

              {isStudiesOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {[
                      { name: "Clinical Study 1", path: "/study1" },
                      { name: "Clinical Study 2", path: "/study2" },
                      { name: "Clinical Study 3", path: "/study3" },
                      { name: "Clinical Study 4", path: "/study4" },
                      { name: "Clinical Study 5", path: "/study5" },
                    ].map((study) => (
                      <button
                        key={study.path}
                        onClick={() => navigate(study.path)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
                      >
                        {study.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/Working")}
              className="text-foreground hover:text-primary transition-colors"
            >
              About DR
            </button>
            <button
              onClick={() => navigate("/ModelWorking")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Working Flow
              </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/sign-in")}>
              Sign In
            </Button>
            <Button variant="default" onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate("/classify");
                  setIsOpen(false);
                }}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Analysis
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/study1");
                  setIsOpen(false);
                }}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Studies
              </button>
              <button
                onClick={() => {
                  navigate("/Working");
                  setIsOpen(false);
                }}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                About DR
              </button>
               <button
                onClick={() => {
                  navigate("/ModelWorking");
                  setIsOpen(false);
                }}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Working Flow
              </button>

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    navigate("/sign-in");
                    setIsOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    navigate("/contact");
                    setIsOpen(false);
                  }}
                >
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
