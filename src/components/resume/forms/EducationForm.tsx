
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Education, useResumeStore } from "@/store/resumeStore";
import { debounce } from "@/utils/debounce";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

type EducationFormValues = {
  education: (Education & { id?: string })[];
};

const EducationForm = () => {
  const education = useResumeStore((state) => state.data.education);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const setStep = useResumeStore((state) => state.setStep);

  // Track if form has been initialized
  const formInitialized = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<EducationFormValues>({
    defaultValues: {
      education: education.length
        ? education
        : [
            {
              id: "",
              institution: "",
              degree: "",
              field: "",
              location: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
              gpa: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  // Set the form as initialized after the first render
  useEffect(() => {
    formInitialized.current = true;
  }, []);

  const onSubmit = (data: EducationFormValues) => {
    // Clear existing education entries
    education.forEach((edu) => removeEducation(edu.id));

    // Add new education entries
    data.education.forEach((edu) => {
      const { id, ...eduWithoutId } = edu;
      addEducation(eduWithoutId);
    });

    toast({
      description: "Education saved successfully",
      variant: "default",
    });

    setStep(3); // Move to the next step (Skills)
  };

  const addNewEducation = () => {
    append({
      id: "",
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      gpa: "",
    });
  };

  // Setup auto-save with debounce
  const debouncedSave = useRef(
    debounce((data: EducationFormValues) => {
      if (!formInitialized.current) return;
      
      // Clear existing education entries to avoid duplication
      const existingIds = new Set(education.map(edu => edu.id));
      const formIds = new Set(data.education.filter(edu => edu.id).map(edu => edu.id));
      
      // Remove education entries that no longer exist in the form
      education.forEach((edu) => {
        if (!formIds.has(edu.id)) {
          removeEducation(edu.id);
        }
      });

      // Update or add education entries
      data.education.forEach((edu) => {
        if (edu.id && existingIds.has(edu.id)) {
          // Update existing education
          updateEducation(edu.id, edu);
        } else {
          // Add new education
          const { id, ...eduWithoutId } = edu;
          addEducation(eduWithoutId);
        }
      });
      
      toast({
        description: "Education saved automatically",
        duration: 2000,
      });
    }, 2000)
  ).current;

  // Watch for changes and auto-save
  const watchAllEducation = watch();

  useEffect(() => {
    if (formInitialized.current && fields.length > 0) {
      debouncedSave(watchAllEducation);
    }
  }, [watchAllEducation, debouncedSave, fields.length]);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg p-4 relative"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>

                {/* Hidden field to track the ID */}
                <input
                  type="hidden"
                  {...register(`education.${index}.id` as const)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.institution`}>
                      Institution
                    </Label>
                    <Input
                      id={`education.${index}.institution`}
                      {...register(`education.${index}.institution` as const, {
                        required: "Institution is required",
                      })}
                    />
                    {errors.education?.[index]?.institution && (
                      <p className="text-sm text-red-500">
                        {errors.education[index]?.institution?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.location`}>
                      Location
                    </Label>
                    <Input
                      id={`education.${index}.location`}
                      {...register(`education.${index}.location` as const)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.degree`}>
                      Degree
                    </Label>
                    <Input
                      id={`education.${index}.degree`}
                      {...register(`education.${index}.degree` as const, {
                        required: "Degree is required",
                      })}
                    />
                    {errors.education?.[index]?.degree && (
                      <p className="text-sm text-red-500">
                        {errors.education[index]?.degree?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.field`}>
                      Field of Study
                    </Label>
                    <Input
                      id={`education.${index}.field`}
                      {...register(`education.${index}.field` as const, {
                        required: "Field of study is required",
                      })}
                    />
                    {errors.education?.[index]?.field && (
                      <p className="text-sm text-red-500">
                        {errors.education[index]?.field?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.startDate`}>
                      Start Date
                    </Label>
                    <Input
                      id={`education.${index}.startDate`}
                      type="month"
                      {...register(`education.${index}.startDate` as const, {
                        required: "Start date is required",
                      })}
                    />
                    {errors.education?.[index]?.startDate && (
                      <p className="text-sm text-red-500">
                        {errors.education[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`education.${index}.endDate`}>
                        End Date
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`education.${index}.current`}
                          {...register(`education.${index}.current` as const)}
                        />
                        <Label
                          htmlFor={`education.${index}.current`}
                          className="text-sm font-normal"
                        >
                          Currently enrolled
                        </Label>
                      </div>
                    </div>
                    <Input
                      id={`education.${index}.endDate`}
                      type="month"
                      {...register(`education.${index}.endDate` as const, {
                        required: watch(`education.${index}.current`) ? false : "End date is required",
                      })}
                      disabled={watch(`education.${index}.current`)}
                    />
                    {errors.education?.[index]?.endDate && (
                      <p className="text-sm text-red-500">
                        {errors.education[index]?.endDate?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.gpa`}>
                      GPA (optional)
                    </Label>
                    <Input
                      id={`education.${index}.gpa`}
                      {...register(`education.${index}.gpa` as const)}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`education.${index}.description`}>
                      Description (optional)
                    </Label>
                    <Textarea
                      id={`education.${index}.description`}
                      {...register(`education.${index}.description` as const)}
                      className="min-h-[80px]"
                      placeholder="Highlight relevant coursework, projects, or achievements..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addNewEducation}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Another Education
          </Button>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Previous
            </Button>
            <Button type="submit">Save & Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EducationForm;
