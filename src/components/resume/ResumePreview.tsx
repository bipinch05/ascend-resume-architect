
import { useResumeStore } from "@/store/resumeStore";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { ResumeDocument } from "./pdf/ResumeDocument";

const ResumePreview = () => {
  const { template, data } = useResumeStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<ResumeDocument template={template} data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">Resume Preview</h2>
        <Button
          variant="outline"
          className="flex items-center gap-2"
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
      <div className="flex-grow overflow-auto bg-gray-100 p-4">
        <div className="resume-paper">{renderTemplate()}</div>
      </div>
    </div>
  );
};

export default ResumePreview;
