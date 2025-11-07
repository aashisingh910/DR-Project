import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Analytics from "./pages/Analysis";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Working from "./pages/Working";
import DRIntroduction from "./pages/introduction";
import DRLearnMorePage from "./pages/learnMore";
import Analysis from "./pages/classify";
import Contact from "./pages/contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/chatbot";
import Study1 from "./pages/study1";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Global Layout */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20"> {/* offset for fixed navbar */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/analysis" element={<Analytics />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Working" element={<Working />} />
              <Route path="/introduction" element={<DRIntroduction />} />
              <Route path="/learnMore" element={<DRLearnMorePage />} />
              <Route path="/classify" element={<Analysis />} />
              <Route path="/study1" element={<Study1 />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <ChatBot />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
