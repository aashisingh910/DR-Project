import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields check
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // TODO: Add actual authentication logic here
    console.log("Form submitted:", formData);

    // Navigate to patient dashboard
    navigate("/patientDashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-background to-primary/5">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Patient Sign In</CardTitle>
            <CardDescription>Enter your details to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Info and Image */}
      <div className="hidden lg:flex flex-1 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative w-full h-full flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-lg text-center space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="src/assets/1.jpg"
                alt="Diabetic Retinopathy Progression"
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Understanding Diabetic Retinopathy
              </h2>
              <p className="text-muted-foreground">
                Early detection through regular screening is crucial in preventing
                vision loss. Our AI-powered system helps identify signs at early stages.
              </p>
              <Alert className="bg-primary/10 border-primary/20">
                <InfoIcon className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm text-primary ml-2">
                  Regular eye examinations are essential for diabetic patients.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
