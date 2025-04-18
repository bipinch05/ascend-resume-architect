
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/store/resumeStore";
import { debounce } from "@/utils/debounce";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type PersonalInfoFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  title: string;
  summary: string;
  linkedin?: string;
  website?: string;
};

const PersonalInfoForm = () => {
  const personalInfo = useResumeStore((state) => state.data.personalInfo);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);
  const setStep = useResumeStore((state) => state.setStep);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonalInfoFormValues>({
    defaultValues: personalInfo,
  });

  const onSubmit = (data: PersonalInfoFormValues) => {
    updatePersonalInfo(data);
    setStep(1); // Move to the next step (Work Experience)
  };

  // Setup auto-save with debounce
  const debouncedSave = debounce((data: PersonalInfoFormValues) => {
    updatePersonalInfo(data);
  }, 2000);

  // Watch for changes and auto-save
  const watchAll = watch();
  
  useEffect(() => {
    debouncedSave(watchAll);
  }, [watchAll, debouncedSave]);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                {...register("title", { required: "Professional title is required" })}
                placeholder="e.g., Senior Software Engineer"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" {...register("state")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" {...register("zipCode")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (optional)</Label>
              <Input id="linkedin" {...register("linkedin")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input id="website" {...register("website")} />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                {...register("summary", {
                  required: "Professional summary is required",
                })}
                className="min-h-[120px]"
                placeholder="Write a brief summary of your professional background and skills..."
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save & Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
