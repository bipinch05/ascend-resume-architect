
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/store/resumeStore";
import { debounce } from "@/utils/debounce";
import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

type CustomSectionFormValues = {
  title: string;
  items: {
    id: string;
    title: string;
    subtitle?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    bulletPoints: string;
  }[];
};

const CustomSectionsForm = () => {
  const customSections = useResumeStore((state) => state.data.customSections);
  const addCustomSection = useResumeStore((state) => state.addCustomSection);
  const updateCustomSection = useResumeStore((state) => state.updateCustomSection);
  const removeCustomSection = useResumeStore((state) => state.removeCustomSection);
  const addCustomSectionItem = useResumeStore((state) => state.addCustomSectionItem);
  const updateCustomSectionItem = useResumeStore((state) => state.updateCustomSectionItem);
  const removeCustomSectionItem = useResumeStore((state) => state.removeCustomSectionItem);
  const setStep = useResumeStore((state) => state.setStep);

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    customSections.length > 0 ? customSections[0].id : null
  );
  const [error, setError] = useState("");

  const activeSection = customSections.find((section) => section.id === activeSectionId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<CustomSectionFormValues>({
    defaultValues: {
      title: activeSection?.title || "",
      items: activeSection?.items.map((item) => ({
        ...item,
        bulletPoints: item.bulletPoints?.join("\n") || "",
      })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Update form when active section changes
  useEffect(() => {
    if (activeSection) {
      reset({
        title: activeSection.title,
        items: activeSection.items.map((item) => ({
          ...item,
          bulletPoints: item.bulletPoints?.join("\n") || "",
        })),
      });
    } else {
      reset({
        title: "",
        items: [],
      });
    }
  }, [activeSection, reset]);

  const onSubmit = (data: CustomSectionFormValues) => {
    if (!activeSectionId) return;

    // Update section title
    updateCustomSection(activeSectionId, data.title);

    // Clear existing items
    activeSection?.items.forEach((item) => {
      removeCustomSectionItem(activeSectionId, item.id);
    });

    // Add updated items
    data.items.forEach((item) => {
      const bulletPoints = item.bulletPoints
        .split("\n")
        .map((point) => point.trim())
        .filter((point) => point.length > 0);

      const itemData = {
        title: item.title,
        subtitle: item.subtitle,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
        bulletPoints,
      };

      if (item.id) {
        updateCustomSectionItem(activeSectionId, item.id, itemData);
      } else {
        addCustomSectionItem(activeSectionId, itemData);
      }
    });
  };

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) {
      setError("Section title is required");
      return;
    }

    // Check if section already exists
    if (customSections.some((s) => s.title.toLowerCase() === newSectionTitle.toLowerCase())) {
      setError("A section with this title already exists");
      return;
    }

    addCustomSection(newSectionTitle.trim());
    setNewSectionTitle("");
    setError("");

    // Set the new section as active
    const newSection = customSections.find(
      (s) => s.title.toLowerCase() === newSectionTitle.toLowerCase()
    );
    if (newSection) {
      setActiveSectionId(newSection.id);
    }
  };

  const handleAddItem = () => {
    append({
      id: "",
      title: "",
      subtitle: "",
      startDate: "",
      endDate: "",
      description: "",
      bulletPoints: "",
    });
  };

  // Setup auto-save with debounce
  const debouncedSave = debounce((data: CustomSectionFormValues) => {
    onSubmit(data);
  }, 2000);

  // Watch for changes and auto-save
  const watchAll = watch();

  useEffect(() => {
    if (activeSectionId && fields.length > 0) {
      debouncedSave(watchAll);
    }
  }, [watchAll, debouncedSave, activeSectionId, fields.length]);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Custom Sections</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="newSectionTitle">New Section Title</Label>
                <Input
                  id="newSectionTitle"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  placeholder="e.g., Certifications, Projects, Volunteer Work"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddSection}>
                  <Plus className="h-4 w-4 mr-2" /> Add Section
                </Button>
              </div>
            </div>
          </div>

          {customSections.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {customSections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSectionId === section.id ? "default" : "outline"}
                    onClick={() => setActiveSectionId(section.id)}
                    className="flex items-center"
                  >
                    {section.title}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomSection(section.id);
                        if (activeSectionId === section.id) {
                          setActiveSectionId(
                            customSections.length > 1
                              ? customSections[0].id === section.id
                                ? customSections[1].id
                                : customSections[0].id
                              : null
                          );
                        }
                      }}
                      className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </Button>
                ))}
              </div>

              {activeSectionId && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Section Title</Label>
                    <Input
                      id="title"
                      {...register("title", { required: "Section title is required" })}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Items</h4>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                        <Plus className="h-3.5 w-3.5 mr-1" /> Add Item
                      </Button>
                    </div>

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor={`items.${index}.title`}>
                              Title
                            </Label>
                            <Input
                              id={`items.${index}.title`}
                              {...register(`items.${index}.title` as const, {
                                required: "Title is required",
                              })}
                            />
                            {errors.items?.[index]?.title && (
                              <p className="text-sm text-red-500">
                                {errors.items[index]?.title?.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`items.${index}.subtitle`}>
                              Subtitle (optional)
                            </Label>
                            <Input
                              id={`items.${index}.subtitle`}
                              {...register(`items.${index}.subtitle` as const)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`items.${index}.startDate`}>
                              Start Date (optional)
                            </Label>
                            <Input
                              id={`items.${index}.startDate`}
                              type="month"
                              {...register(`items.${index}.startDate` as const)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`items.${index}.endDate`}>
                              End Date (optional)
                            </Label>
                            <Input
                              id={`items.${index}.endDate`}
                              type="month"
                              {...register(`items.${index}.endDate` as const)}
                            />
                          </div>

                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor={`items.${index}.description`}>
                              Description (optional)
                            </Label>
                            <Textarea
                              id={`items.${index}.description`}
                              {...register(`items.${index}.description` as const)}
                              className="min-h-[80px]"
                            />
                          </div>

                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor={`items.${index}.bulletPoints`}>
                              Bullet Points (one per line, optional)
                            </Label>
                            <Textarea
                              id={`items.${index}.bulletPoints`}
                              {...register(`items.${index}.bulletPoints` as const)}
                              className="min-h-[80px]"
                              placeholder="• Won first place in hackathon
• Published research paper on machine learning
• Mentored junior developers"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {fields.length === 0 && (
                      <div className="text-center py-8 text-gray-500 border rounded-lg">
                        No items added yet. Click "Add Item" to add your first item.
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Save Section</Button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={() => setStep(3)}>
              Previous
            </Button>
            <Button onClick={() => setStep(5)}>Finish & Preview</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomSectionsForm;
