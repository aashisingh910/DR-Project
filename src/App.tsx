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


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/analysis" element={<Analytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Working" element={<Working />} />
          <Route path="/introduction" element={<DRIntroduction />} />
          <Route path="/learnMore" element={<DRLearnMorePage />} />
          <Route path="/classify" element={<Analysis />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
