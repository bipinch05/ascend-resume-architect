
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skill, useResumeStore } from "@/store/resumeStore";
import { debounce } from "@/utils/debounce";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const SkillsForm = () => {
  const skills = useResumeStore((state) => state.data.skills);
  const addSkill = useResumeStore((state) => state.addSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const setStep = useResumeStore((state) => state.setStep);

  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<Skill["level"]>("intermediate");
  const [error, setError] = useState("");

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      setError("Skill name is required");
      return;
    }

    // Check if skill already exists
    if (skills.some((skill) => skill.name.toLowerCase() === newSkill.toLowerCase())) {
      setError("This skill already exists");
      return;
    }

    addSkill({
      name: newSkill.trim(),
      level: newSkillLevel,
    });

    setNewSkill("");
    setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (id: string) => {
    removeSkill(id);
  };

  // Group skills by level
  const skillsByLevel = {
    beginner: skills.filter((skill) => skill.level === "beginner"),
    intermediate: skills.filter((skill) => skill.level === "intermediate"),
    advanced: skills.filter((skill) => skill.level === "advanced"),
    expert: skills.filter((skill) => skill.level === "expert"),
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Add Your Skills</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="newSkill">Skill Name</Label>
                <Input
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="e.g., JavaScript, Project Management, UX Design"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <div className="w-full md:w-48 space-y-2">
                <Label htmlFor="newSkillLevel">Proficiency Level</Label>
                <Select
                  value={newSkillLevel}
                  onValueChange={(value) => setNewSkillLevel(value as Skill["level"])}
                >
                  <SelectTrigger id="newSkillLevel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddSkill}>
                  <Plus className="h-4 w-4 mr-2" /> Add Skill
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(skillsByLevel).map(([level, levelSkills]) => 
              levelSkills.length > 0 && (
                <div key={level} className="space-y-2">
                  <h4 className="font-medium capitalize">{level}</h4>
                  <div className="flex flex-wrap gap-2">
                    {levelSkills.map((skill) => (
                      <Badge 
                        key={skill.id} 
                        variant="secondary"
                        className="px-3 py-1.5 text-sm flex items-center gap-1"
                      >
                        {skill.name}
                        <button
                          onClick={() => handleRemoveSkill(skill.id)}
                          className="ml-1 text-gray-500 hover:text-red-500 focus:outline-none"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            )}

            {skills.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No skills added yet. Add your first skill above.
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>
              Previous
            </Button>
            <Button onClick={() => setStep(4)}>Save & Continue</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
