import { useCallback, useState } from "react";
import { Upload, FileImage, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Please upload a JPEG or PNG image file"
      };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        valid: false,
        error: "File size must be less than 10MB"
      };
    }

    return { valid: true };
  };

  const handleFile = useCallback((file: File) => {
    const validation = validateFile(file);
    
    if (!validation.valid) {
      toast({
        variant: "destructive",
        title: "Invalid File",
        description: validation.error,
      });
      return;
    }

    toast({
      title: "File Uploaded",
      description: `${file.name} uploaded successfully`,
    });

    onUpload(file);
  }, [onUpload, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <Card className="border-2 border-dashed transition-all duration-300 hover:border-primary/50">
      <CardContent className="p-12">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`text-center transition-all duration-300 ${
            isDragging ? "scale-105" : ""
          }`}
        >
          <div className={`mx-auto mb-6 p-6 rounded-full inline-block transition-all duration-300 ${
            isDragging ? "bg-primary/20 animate-pulse-glow" : "bg-primary/10"
          }`}>
            {isDragging ? (
              <Upload className="w-16 h-16 text-primary animate-bounce" />
            ) : (
              <FileImage className="w-16 h-16 text-primary" />
            )}
          </div>

          <h3 className="text-2xl font-semibold mb-3">
            {isDragging ? "Drop your image here" : "Upload Fundus Image"}
          </h3>
          
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Drag and drop your fundus image here, or click to browse your files
          </p>

          <div className="mb-8">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileInput}
            />
            <label htmlFor="file-upload">
              <Button variant="hero" size="lg" className="cursor-pointer" asChild>
                <span>
                  <Upload className="w-5 h-5 mr-2" />
                  Select Image
                </span>
              </Button>
            </label>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <div className="font-medium">Supported Formats</div>
                <div className="text-muted-foreground">JPEG, JPG, PNG</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <div className="font-medium">Maximum Size</div>
                <div className="text-muted-foreground">Up to 10MB</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <div className="font-medium">Image Quality</div>
                <div className="text-muted-foreground">High resolution recommended</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
