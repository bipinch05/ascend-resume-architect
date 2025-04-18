
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore, WorkExperience } from "@/store/resumeStore";
import { debounce } from "@/utils/debounce";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

type WorkExperienceFormValues = {
  experiences: (Omit<WorkExperience, "id" | "achievements"> & {
    achievements: string;
    id?: string;
  })[];
};

const WorkExperienceForm = () => {
  const workExperiences = useResumeStore((state) => state.data.workExperience);
  const addWorkExperience = useResumeStore((state) => state.addWorkExperience);
  const updateWorkExperience = useResumeStore((state) => state.updateWorkExperience);
  const removeWorkExperience = useResumeStore((state) => state.removeWorkExperience);
  const setStep = useResumeStore((state) => state.setStep);
  
  // Track if form has been initialized
  const formInitialized = useRef(false);

  // Transform work experiences for the form
  const formattedExperiences = workExperiences.map((exp) => ({
    ...exp,
    achievements: exp.achievements.join("\n"),
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<WorkExperienceFormValues>({
    defaultValues: {
      experiences: formattedExperiences.length
        ? formattedExperiences
        : [
            {
              position: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
              achievements: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  // Set the form as initialized after the first render
  useEffect(() => {
    formInitialized.current = true;
  }, []);

  // Setup auto-save with debounce
  const debouncedSave = useRef(
    debounce((data: WorkExperienceFormValues) => {
      if (!formInitialized.current) return;
      
      // Clear existing work experiences to avoid duplication
      const existingIds = new Set(workExperiences.map(exp => exp.id));
      const formIds = new Set(data.experiences.filter(exp => exp.id).map(exp => exp.id));
      
      // Remove experiences that no longer exist in the form
      workExperiences.forEach((exp) => {
        if (!formIds.has(exp.id)) {
          removeWorkExperience(exp.id);
        }
      });

      // Update or add experiences
      data.experiences.forEach((exp) => {
        const achievements = exp.achievements
          ? exp.achievements
              .split("\n")
              .map((achievement) => achievement.trim())
              .filter((achievement) => achievement.length > 0)
          : [];

        if (exp.id && existingIds.has(exp.id)) {
          // Update existing experience
          updateWorkExperience(exp.id, {
            ...exp,
            achievements,
          });
        } else {
          // Add new experience
          const { id, ...expWithoutId } = exp;
          addWorkExperience({
            ...expWithoutId,
            achievements,
          });
        }
      });
      
      toast({
        description: "Work experience saved automatically",
        duration: 2000,
      });
    }, 2000)
  ).current;

  const onSubmit = (data: WorkExperienceFormValues) => {
    // Clear existing work experiences to avoid duplication
    workExperiences.forEach((exp) => {
      removeWorkExperience(exp.id);
    });

    // Add new work experiences
    data.experiences.forEach((exp) => {
      const achievements = exp.achievements
        ? exp.achievements
            .split("\n")
            .map((achievement) => achievement.trim())
            .filter((achievement) => achievement.length > 0)
        : [];

      const { id, ...expWithoutId } = exp;
      addWorkExperience({
        ...expWithoutId,
        achievements,
      });
    });

    toast({
      description: "Work experiences saved successfully",
      variant: "default",
    });

    setStep(2);
  };

  const addNewExperience = () => {
    append({
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: "",
    });
  };

  // Watch for changes and auto-save
  const watchAllExperiences = watch();
  
  useEffect(() => {
    if (formInitialized.current && fields.length > 0) {
      debouncedSave(watchAllExperiences);
    }
  }, [watchAllExperiences, debouncedSave, fields.length]);

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
                  {...register(`experiences.${index}.id` as const)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.position`}>
                      Position
                    </Label>
                    <Input
                      id={`experiences.${index}.position`}
                      {...register(`experiences.${index}.position` as const, {
                        required: "Position is required",
                      })}
                    />
                    {errors.experiences?.[index]?.position && (
                      <p className="text-sm text-red-500">
                        {errors.experiences[index]?.position?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.company`}>
                      Company
                    </Label>
                    <Input
                      id={`experiences.${index}.company`}
                      {...register(`experiences.${index}.company` as const, {
                        required: "Company is required",
                      })}
                    />
                    {errors.experiences?.[index]?.company && (
                      <p className="text-sm text-red-500">
                        {errors.experiences[index]?.company?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.location`}>
                      Location
                    </Label>
                    <Input
                      id={`experiences.${index}.location`}
                      {...register(`experiences.${index}.location` as const)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`experiences.${index}.startDate`}>
                      Start Date
                    </Label>
                    <Input
                      id={`experiences.${index}.startDate`}
                      type="month"
                      {...register(`experiences.${index}.startDate` as const, {
                        required: "Start date is required",
                      })}
                    />
                    {errors.experiences?.[index]?.startDate && (
                      <p className="text-sm text-red-500">
                        {errors.experiences[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`experiences.${index}.endDate`}>
                        End Date
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`experiences.${index}.current`}
                          {...register(`experiences.${index}.current` as const)}
                        />
                        <Label
                          htmlFor={`experiences.${index}.current`}
                          className="text-sm font-normal"
                        >
                          Current position
                        </Label>
                      </div>
                    </div>
                    <Input
                      id={`experiences.${index}.endDate`}
                      type="month"
                      {...register(`experiences.${index}.endDate` as const, {
                        required: watch(`experiences.${index}.current`) ? false : "End date is required",
                      })}
                      disabled={watch(`experiences.${index}.current`)}
                    />
                    {errors.experiences?.[index]?.endDate && (
                      <p className="text-sm text-red-500">
                        {errors.experiences[index]?.endDate?.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`experiences.${index}.description`}>
                      Job Description
                    </Label>
                    <Textarea
                      id={`experiences.${index}.description`}
                      {...register(`experiences.${index}.description` as const, {
                        required: "Job description is required",
                      })}
                      className="min-h-[80px]"
                    />
                    {errors.experiences?.[index]?.description && (
                      <p className="text-sm text-red-500">
                        {errors.experiences[index]?.description?.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`experiences.${index}.achievements`}>
                      Key Achievements (one per line)
                    </Label>
                    <Textarea
                      id={`experiences.${index}.achievements`}
                      {...register(`experiences.${index}.achievements` as const)}
                      className="min-h-[120px]"
                      placeholder="• Led a team of 5 developers to launch a new product feature
• Increased conversion rate by 25% through UI optimizations
• Reduced API response time by 40% through code optimization"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addNewExperience}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Another Work Experience
          </Button>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(0)}>
              Previous
            </Button>
            <Button type="submit">Save & Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkExperienceForm;
