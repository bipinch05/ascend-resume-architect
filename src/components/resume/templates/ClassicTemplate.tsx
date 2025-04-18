
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, MapPin, Phone, Smartphone } from "lucide-react";

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  // Group skills by level
  const skillLevels = {
    expert: skills.filter((skill) => skill.level === "expert"),
    advanced: skills.filter((skill) => skill.level === "advanced"),
    intermediate: skills.filter((skill) => skill.level === "intermediate"),
    beginner: skills.filter((skill) => skill.level === "beginner"),
  };

  return (
    <div className="classic-template text-resume-blue">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl text-resume-blue-light mb-3">{personalInfo.title}</h2>
        )}
        
        <div className="flex justify-center flex-wrap gap-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <AtSign className="h-3.5 w-3.5" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {personalInfo.city}
                {personalInfo.city && personalInfo.state && ", "}
                {personalInfo.state}
              </span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <span>LinkedIn:</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <span>Website:</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-2 pb-1">
            Professional Summary
          </h3>
          <p className="text-sm whitespace-pre-line">{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-2 pb-1">
            Work Experience
          </h3>
          <div className="space-y-4">
            {workExperience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold">{job.position}</h4>
                  <span className="text-sm">
                    {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <h5 className="text-resume-blue-light font-medium">
                    {job.company}
                    {job.location && `, ${job.location}`}
                  </h5>
                </div>
                <p className="text-sm mb-2">{job.description}</p>
                {job.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm ml-2 space-y-1">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-2 pb-1">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                  <span className="text-sm">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <h5 className="text-resume-blue-light font-medium">
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </h5>
                  {edu.gpa && <span className="text-sm">GPA: {edu.gpa}</span>}
                </div>
                {edu.description && <p className="text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-2 pb-1">
            Skills
          </h3>
          
          {Object.entries(skillLevels).map(([level, levelSkills]) => 
            levelSkills.length > 0 && (
              <div key={level} className="mb-2">
                <h4 className="font-medium capitalize text-sm mb-1">{level}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {levelSkills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Custom Sections */}
      {customSections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-2 pb-1">
            {section.title}
          </h3>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold">{item.title}</h4>
                  {(item.startDate || item.endDate) && (
                    <span className="text-sm">
                      {item.startDate && formatDate(item.startDate)}
                      {item.startDate && item.endDate && " - "}
                      {item.endDate && formatDate(item.endDate)}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <h5 className="text-resume-blue-light font-medium mb-2">{item.subtitle}</h5>
                )}
                {item.description && <p className="text-sm mb-2">{item.description}</p>}
                {item.bulletPoints && item.bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside text-sm ml-2 space-y-1">
                    {item.bulletPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassicTemplate;
