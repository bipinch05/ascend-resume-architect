
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, MapPin, Phone, Link as LinkIcon } from "lucide-react";

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
    beginner: skills.filter((skill) => skill.level === "beginner")
  };

  return (
    <div className="classic-template text-resume-blue bg-white rounded shadow-sm p-8 mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b border-resume-blue pb-4">
        <h1 className="text-3xl font-bold mb-1 text-resume-blue-light tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl text-resume-blue mb-3 font-medium">{personalInfo.title}</h2>
        )}
        
        <div className="flex justify-center flex-wrap gap-4 text-sm mt-4">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <AtSign className="h-3.5 w-3.5 text-resume-accent" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-resume-accent" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-resume-accent" />
              <span>
                {personalInfo.city}
                {personalInfo.city && personalInfo.state && ", "}
                {personalInfo.state}
              </span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-resume-accent" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-resume-accent" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-3 pb-1 text-resume-blue">
            Professional Summary
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-3 pb-1 text-resume-blue">
            Work Experience
          </h3>
          <div className="space-y-5">
            {workExperience.map((job) => (
              <div key={job.id} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h4 className="font-bold text-resume-blue-light">{job.position}</h4>
                  <span className="text-sm text-gray-600 mt-1 sm:mt-0">
                    {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <div className="mb-2">
                  <h5 className="text-gray-700 font-medium">
                    {job.company}
                    {job.location && `, ${job.location}`}
                  </h5>
                </div>
                <p className="text-sm mb-2 text-gray-700">{job.description}</p>
                {job.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm ml-2 space-y-1 text-gray-700">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="pl-1">{achievement}</li>
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
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-3 pb-1 text-resume-blue">
            Education
          </h3>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h4 className="font-bold text-resume-blue-light">{edu.degree} in {edu.field}</h4>
                  <span className="text-sm text-gray-600 mt-1 sm:mt-0">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h5 className="text-gray-700 font-medium">
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </h5>
                  {edu.gpa && <span className="text-sm text-gray-600">GPA: {edu.gpa}</span>}
                </div>
                {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-3 pb-1 text-resume-blue">
            Skills
          </h3>
          
          <div className="space-y-4">
            {Object.entries(skillLevels).map(([level, levelSkills]) => 
              levelSkills.length > 0 && (
                <div key={level} className="mb-2">
                  <h4 className="font-medium capitalize text-sm mb-2 text-resume-blue-light">{level}</h4>
                  <div className="flex flex-wrap gap-2">
                    {levelSkills.map((skill) => (
                      <span 
                        key={skill.id} 
                        className="inline-block bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="text-lg font-bold border-b-2 border-resume-blue mb-3 pb-1 text-resume-blue">
            {section.title}
          </h3>
          <div className="space-y-5">
            {section.items.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h4 className="font-bold text-resume-blue-light">{item.title}</h4>
                  {(item.startDate || item.endDate) && (
                    <span className="text-sm text-gray-600 mt-1 sm:mt-0">
                      {item.startDate && formatDate(item.startDate)}
                      {item.startDate && item.endDate && " - "}
                      {item.endDate && formatDate(item.endDate)}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <h5 className="text-gray-700 font-medium mb-2">{item.subtitle}</h5>
                )}
                {item.description && <p className="text-sm mb-2 text-gray-700">{item.description}</p>}
                {item.bulletPoints && item.bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside text-sm ml-2 space-y-1 text-gray-700">
                    {item.bulletPoints.map((point, i) => (
                      <li key={i} className="pl-1">{point}</li>
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
