
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useResumeStore } from "@/store/resumeStore";
import FormStepper from "@/components/resume/FormStepper";
import PersonalInfoForm from "@/components/resume/forms/PersonalInfoForm";
import WorkExperienceForm from "@/components/resume/forms/WorkExperienceForm";
import EducationForm from "@/components/resume/forms/EducationForm";
import SkillsForm from "@/components/resume/forms/SkillsForm";
import CustomSectionsForm from "@/components/resume/forms/CustomSectionsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import TemplateSelector from "@/components/resume/TemplateSelector";
import AIAssistant from "@/components/resume/AIAssistant";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, PaintBucket } from "lucide-react";

const Index = () => {
  const { currentStep, template, setTemplate } = useResumeStore();
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <WorkExperienceForm />;
      case 2:
        return <EducationForm />;
      case 3:
        return <SkillsForm />;
      case 4:
        return <CustomSectionsForm />;
      case 5:
        return null; // Preview is shown separately
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-resume-blue mb-2">Build Your Resume</h1>
            <p className="text-gray-600">
              Create a professional resume that will help you stand out and get hired.
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setIsTemplateSelectorOpen(true)}
            >
              <LayoutTemplate className="h-4 w-4" />
              Change Template
            </Button>
          </div>
        </div>

        <FormStepper />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Editor Column */}
          <div className={currentStep < 5 ? "lg:col-span-6" : "lg:col-span-0 hidden"}>
            {renderCurrentStep()}
            
            {currentStep < 5 && (
              <div className="mt-6">
                <AIAssistant 
                  label={
                    currentStep === 0
                      ? "Professional Summary"
                      : currentStep === 1
                      ? "Job Description"
                      : currentStep === 3
                      ? "Skills"
                      : "Content"
                  }
                  placeholder={
                    currentStep === 0
                      ? "Get suggestions for your professional summary..."
                      : currentStep === 1
                      ? "Get suggestions for job descriptions and achievements..."
                      : currentStep === 3
                      ? "Get suggestions for relevant skills..."
                      : "Get AI-powered content suggestions..."
                  }
                  onSuggestion={(suggestion) => {
                    // In a real implementation, this would update the form fields
                    console.log("Suggestion:", suggestion);
                  }}
                />
              </div>
            )}
          </div>

          {/* Preview Column */}
          <div className={currentStep < 5 ? "lg:col-span-6" : "lg:col-span-12"}>
            <div className="sticky top-6 h-[calc(100vh-200px)]">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>

      <TemplateSelector
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
      />
    </MainLayout>
  );
};

export default Index;
