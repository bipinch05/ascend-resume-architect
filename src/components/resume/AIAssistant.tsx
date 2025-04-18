
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, RefreshCw, SendIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AIAssistantProps {
  label: string;
  placeholder: string;
  onSuggestion: (suggestion: string) => void;
}

const AIAssistant = ({ label, placeholder, onSuggestion }: AIAssistantProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();

  const handleGenerateSuggestion = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call to an AI service
      // For now, we'll simulate a response with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample suggestions based on the label
      let mockSuggestion = "";
      
      if (label.includes("summary")) {
        mockSuggestion = "Results-driven software engineer with 5+ years of experience developing scalable applications. Proficient in JavaScript, TypeScript, and React. Dedicated to delivering high-quality code and improving user experience.";
      } else if (label.includes("job")) {
        mockSuggestion = "• Led development of a customer-facing web application, increasing user engagement by 45%\n• Optimized API response times by 60% through implementing caching strategies\n• Mentored junior developers and conducted code reviews to maintain code quality";
      } else if (label.includes("skill")) {
        mockSuggestion = "JavaScript, React, TypeScript, Node.js, SQL, Git, CI/CD, Agile Methodologies";
      } else {
        mockSuggestion = "Here's a suggestion to improve your content. Consider adding more specific metrics and achievements to make your resume stand out.";
      }
      
      setSuggestion(mockSuggestion);
    } catch (error) {
      console.error("Error generating suggestion:", error);
      toast({
        title: "Error",
        description: "Failed to generate suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySuggestion = () => {
    onSuggestion(suggestion);
    setSuggestion("");
    toast({
      title: "Success",
      description: "Suggestion applied successfully!",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-resume-accent" /> AI Assistant
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions to enhance your {label.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {suggestion ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border text-sm whitespace-pre-line">
              {suggestion}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSuggestion("")}
              >
                Discard
              </Button>
              <Button size="sm" onClick={handleApplySuggestion}>
                Apply Suggestion
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGenerateSuggestion}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate {label} Suggestion
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
