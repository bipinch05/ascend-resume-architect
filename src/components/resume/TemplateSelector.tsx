
import { Button } from "@/components/ui/button";
import { ResumeTemplate, useResumeStore } from "@/store/resumeStore";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const templates: { id: ResumeTemplate; name: string; description: string }[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional resume layout with a clean and professional style",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a header accent and two-column layout",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated template for senior professionals and executives",
  },
];

const TemplateSelector = ({ isOpen, onClose }: TemplateSelectorProps) => {
  const { template, setTemplate } = useResumeStore();

  const handleSelectTemplate = (templateId: ResumeTemplate) => {
    setTemplate(templateId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
          <p className="text-gray-600 mb-6">
            Select a template that best fits your professional style. You can switch templates
            anytime without losing your resume content.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md",
                  template === t.id && "ring-2 ring-resume-accent"
                )}
                onClick={() => handleSelectTemplate(t.id)}
              >
                <div className="h-40 bg-gray-100 relative">
                  <div className={`h-full w-full ${t.id}-preview`}></div>
                  {template === t.id && (
                    <div className="absolute top-2 right-2 bg-resume-accent text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
