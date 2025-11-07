import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  Eye
} from "lucide-react";
import { AnalysisResult } from "@/pages/Analysis";

interface AnalysisResultsProps {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  imageUrl: string | null;
  onReset: () => void;
}

const AnalysisResults = ({ isAnalyzing, result, imageUrl, onReset }: AnalysisResultsProps) => {
  const getSeverityColor = (severity: AnalysisResult["severity"]) => {
    switch (severity) {
      case "No DR":
        return "bg-success text-success-foreground";
      case "Mild":
        return "bg-warning text-warning-foreground";
      case "Moderate":
        return "bg-warning text-warning-foreground";
      case "Severe":
        return "bg-destructive text-destructive-foreground";
      case "Proliferative":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: AnalysisResult["severity"]) => {
    if (severity === "No DR") {
      return <CheckCircle2 className="w-5 h-5" />;
    }
    return <AlertTriangle className="w-5 h-5" />;
  };

  if (isAnalyzing) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-12">
          <div className="text-center space-y-6">
            <div className="mx-auto p-6 bg-primary/10 rounded-full inline-block animate-pulse-glow">
              <Eye className="w-16 h-16 text-primary" />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-2">Analyzing Image...</h3>
              <p className="text-muted-foreground">
                Our AI is examining the fundus image for signs of diabetic retinopathy
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-3">
              <Progress value={33} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Processing image...</span>
                <span>Estimated: 2 minutes</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-6">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">Step 1</div>
                <div className="text-sm font-medium">Image Processing</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-xs text-primary mb-1">Step 2</div>
                <div className="text-sm font-medium">AI Analysis</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">Step 3</div>
                <div className="text-sm font-medium">Results</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analysis Complete</h2>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4" />
            Analyzed on {result.analyzedAt.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
          <Button variant="default">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Image</CardTitle>
          </CardHeader>
          <CardContent>
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt="Uploaded fundus image for diabetic retinopathy analysis" 
                className="w-full rounded-lg shadow-md"
              />
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Diagnosis
                <Badge className={getSeverityColor(result.severity)}>
                  {getSeverityIcon(result.severity)}
                  {result.severity}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <span className="text-sm font-bold text-primary">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress value={result.confidence * 100} className="h-3" />
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-2">Severity Classification</div>
                <div className="text-lg font-semibold">{result.severity}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Key Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.findings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{finding}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Clinical Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-card">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-sm leading-relaxed">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Important Notice</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This AI analysis is intended to assist healthcare professionals and should not replace 
                clinical judgment. Always consult with a qualified ophthalmologist or retina specialist 
                for definitive diagnosis and treatment planning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
