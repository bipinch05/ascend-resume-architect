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
  // Track if autosave is enabled
  const autosaveEnabled = useRef(false);
  // Track IDs of education entries that are being managed
  const managedEducationIds = useRef<Set<string>>(new Set());

  // Set initial managed IDs
  useEffect(() => {
    education.forEach(edu => {
      managedEducationIds.current.add(edu.id);
    });
  }, [education]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    setValue,
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
    
    // Add a small delay before enabling autosave to prevent initial save
    const timer = setTimeout(() => {
      autosaveEnabled.current = true;
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data: EducationFormValues) => {
    // Disable autosave during manual save
    autosaveEnabled.current = false;
    
    // Keep track of updated IDs
    const updatedIds = new Set<string>();
    
    // Update existing education entries or add new ones
    data.education.forEach((edu, index) => {
      if (edu.id) {
        // Update existing education
        updateEducation(edu.id, edu);
        updatedIds.add(edu.id);
      } else {
        // Add new education
        const { id, ...eduWithoutId } = edu;
        addEducation(eduWithoutId);
        
        // Find the newly added education in the store (it will have a new ID)
        if (education.length > 0) {
          const newId = education[education.length - 1].id;
          if (newId) {
            updatedIds.add(newId);
            managedEducationIds.current.add(newId);
          }
        }
      }
    });
    
    // Remove education entries that aren't in the form anymore
    education.forEach((edu) => {
      if (!updatedIds.has(edu.id) && !data.education.some(formEdu => formEdu.id === edu.id)) {
        removeEducation(edu.id);
        managedEducationIds.current.delete(edu.id);
      }
    });

    toast({
      description: "Education saved successfully",
      variant: "default",
    });
    
    // Re-enable autosave after a short delay
    setTimeout(() => {
      autosaveEnabled.current = true;
    }, 1000);

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
      if (!formInitialized.current || !autosaveEnabled.current) return;
      
      // Create a map of existing education entries by ID for quick lookup
      const existingEduMap = new Map(education.map(edu => [edu.id, edu]));
      
      // Create a map of form education entries by ID for quick lookup
      const formEduMap = new Map(
        data.education.filter(edu => edu.id).map(edu => [edu.id, edu])
      );
      
      // Track current form IDs to identify what's been removed
      const currentFormIds = new Set(data.education.filter(edu => edu.id).map(edu => edu.id as string));
      
      // IDs that no longer exist in the form should be removed (they were deleted by user)
      managedEducationIds.current.forEach(id => {
        if (!currentFormIds.has(id)) {
          removeEducation(id);
          managedEducationIds.current.delete(id);
        }
      });

      // Update or add education entries
      data.education.forEach((edu, index) => {
        if (edu.id && existingEduMap.has(edu.id)) {
          // Update existing education
          updateEducation(edu.id, edu);
        } else if (!edu.id) {
          // Only add new education if they don't have an ID yet
          // (prevents duplicate additions)
          const { id, ...eduWithoutId } = edu;
          
          // Add the new education entry
          addEducation(eduWithoutId);
          
          // Find the newly added education in the store (it will have a new ID)
          // We need to update the form field with this ID to prevent duplicate creation
          if (education.length > index) {
            const newId = education[education.length - 1].id;
            setValue(`education.${index}.id`, newId);
            managedEducationIds.current.add(newId);
          }
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
    if (formInitialized.current && fields.length > 0 && autosaveEnabled.current) {
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
