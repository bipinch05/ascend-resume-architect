
import { useResumeStore } from "@/store/resumeStore";
import { cn } from "@/lib/utils";
import { Briefcase, GraduationCap, User, Wrench, Layers, FileText } from "lucide-react";

const steps = [
  {
    id: 0,
    name: "Personal Info",
    icon: User,
  },
  {
    id: 1,
    name: "Work Experience",
    icon: Briefcase,
  },
  {
    id: 2,
    name: "Education",
    icon: GraduationCap,
  },
  {
    id: 3,
    name: "Skills",
    icon: Wrench,
  },
  {
    id: 4,
    name: "Custom Sections",
    icon: Layers,
  },
  {
    id: 5,
    name: "Preview & Export",
    icon: FileText,
  },
];

const FormStepper = () => {
  const currentStep = useResumeStore((state) => state.currentStep);
  const setStep = useResumeStore((state) => state.setStep);

  return (
    <nav className="py-4 w-full">
      <ol className="flex items-center w-full overflow-x-auto">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isPrevious = currentStep > step.id;
          const isNext = currentStep < step.id;

          return (
            <li
              key={step.id}
              className={cn(
                "flex items-center",
                index < steps.length - 1 && "flex-1"
              )}
            >
              <button
                onClick={() => setStep(step.id)}
                className={cn(
                  "flex items-center justify-center gap-2 whitespace-nowrap transition-colors",
                  isActive && "text-resume-accent font-medium",
                  isPrevious && "text-gray-500 hover:text-resume-accent",
                  isNext && "text-gray-400 cursor-default",
                  index === steps.length - 1 && "flex-none"
                )}
                disabled={isNext}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-full text-white text-sm",
                    isActive && "bg-resume-accent",
                    isPrevious && "bg-gray-500",
                    isNext && "bg-gray-300"
                  )}
                >
                  <step.icon className="h-4 w-4" />
                </span>
                <span className="hidden sm:inline">{step.name}</span>
              </button>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2",
                    isPrevious && "bg-gray-500",
                    isActive && "bg-gray-300",
                    isNext && "bg-gray-300"
                  )}
                ></div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default FormStepper;
