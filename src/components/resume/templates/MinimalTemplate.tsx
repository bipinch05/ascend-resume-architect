
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, MapPin, Phone, Link as LinkIcon } from "lucide-react";

interface MinimalTemplateProps {
  data: ResumeData;
}

const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  return (
    <div className="minimal-template bg-white p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light mb-1 text-resume-blue tracking-wider uppercase">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-lg text-resume-blue-light mb-4 font-normal tracking-wide">
            {personalInfo.title}
          </h2>
        )}
        
        <div className="flex justify-center flex-wrap gap-4 text-sm mt-4">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <AtSign className="h-3.5 w-3.5 text-resume-accent" />
              <span className="text-resume-gray-text">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-resume-accent" />
              <span className="text-resume-gray-text">{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-resume-accent" />
              <span className="text-resume-gray-text">
                {personalInfo.city}
                {personalInfo.city && personalInfo.state && ", "}
                {personalInfo.state}
              </span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-resume-accent" />
              <span className="text-resume-gray-text">{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-resume-accent" />
              <span className="text-resume-gray-text">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h3 className="text-md uppercase tracking-widest font-normal border-b border-resume-border mb-3 pb-1 text-resume-blue">
            Profile
          </h3>
          <p className="text-sm leading-relaxed text-resume-gray-text">{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md uppercase tracking-widest font-normal border-b border-resume-border mb-3 pb-1 text-resume-blue">
            Experience
          </h3>
          <div className="space-y-5">
            {workExperience.map((job) => (
              <div key={job.id} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h4 className="font-semibold text-resume-text">{job.position}</h4>
                  <span className="text-xs text-resume-gray-text">
                    {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <h5 className="text-resume-gray-text text-sm mb-2">
                  {job.company}
                  {job.location && `, ${job.location}`}
                </h5>
                <p className="text-sm text-resume-gray-text mb-2">{job.description}</p>
                {job.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm ml-2 space-y-1 text-resume-gray-text">
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
        <div className="mb-8">
          <h3 className="text-md uppercase tracking-widest font-normal border-b border-resume-border mb-3 pb-1 text-resume-blue">
            Education
          </h3>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h4 className="font-semibold text-resume-text">{edu.degree} in {edu.field}</h4>
                  <span className="text-xs text-resume-gray-text">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h5 className="text-resume-gray-text text-sm">
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </h5>
                  {edu.gpa && <span className="text-xs text-resume-gray-text">GPA: {edu.gpa}</span>}
                </div>
                {edu.description && <p className="text-sm text-resume-gray-text">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md uppercase tracking-widest font-normal border-b border-resume-border mb-3 pb-1 text-resume-blue">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id} 
                className="inline-block border border-resume-border rounded px-3 py-1 text-xs font-medium text-resume-gray-text"
              >
                {skill.name} {skill.level !== "beginner" && `• ${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.map((section) => (
        <div key={section.id} className="mb-8">
          <h3 className="text-md uppercase tracking-widest font-normal border-b border-resume-border mb-3 pb-1 text-resume-blue">
            {section.title}
          </h3>
          <div className="space-y-5">
            {section.items.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h4 className="font-semibold text-resume-text">{item.title}</h4>
                  {(item.startDate || item.endDate) && (
                    <span className="text-xs text-resume-gray-text">
                      {item.startDate && formatDate(item.startDate)}
                      {item.startDate && item.endDate && " - "}
                      {item.endDate && formatDate(item.endDate)}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <h5 className="text-resume-gray-text text-sm mb-2">{item.subtitle}</h5>
                )}
                {item.description && <p className="text-sm text-resume-gray-text mb-2">{item.description}</p>}
                {item.bulletPoints && item.bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside text-sm ml-2 space-y-1 text-resume-gray-text">
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

export default MinimalTemplate;
