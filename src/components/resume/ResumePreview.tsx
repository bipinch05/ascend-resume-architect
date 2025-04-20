
import { useResumeStore } from "@/store/resumeStore";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import { ResumeDocument } from "./pdf/ResumeDocument";

const ResumePreview = () => {
  const { template, data } = useResumeStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    let blob = null;
    try {
      // Create PDF document
      blob = await pdf(<ResumeDocument template={template} data={data} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);

      toast({
        title: "Success",
        description: "Resume downloaded successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      if (blob) {
        // Additional cleanup to help with memory management
        URL.revokeObjectURL(URL.createObjectURL(blob));
      }
    }
  };

  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return <ClassicTemplate data={data} />;
      case "modern":
        return <ModernTemplate data={data} />;
      case "executive":
        return <ExecutiveTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "professional":
        return <ProfessionalTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div className="h-full flex flex-col dark:bg-slate-900">
      <div className="bg-card dark:bg-slate-800 p-4 border-b border-border dark:border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-medium dark:text-white">Resume Preview</h2>
        <Button
          variant="outline"
          className="flex items-center gap-2 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          onClick={handleDownloadPDF}
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>
      <div className="flex-grow overflow-auto bg-muted/50 dark:bg-slate-800/50 p-4">
        <div className="resume-paper">{renderTemplate()}</div>
      </div>
    </div>
  );
};

export default ResumePreview;
