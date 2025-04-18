
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, Link as LinkIcon, MapPin, Phone } from "lucide-react";

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate = ({ data }: ExecutiveTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  return (
    <div className="executive-template">
      {/* Header */}
      <div className="mb-6 border-b-4 border-resume-blue pb-4">
        <h1 className="text-4xl font-bold mb-1 text-resume-blue">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl text-resume-blue-light mb-4">{personalInfo.title}</h2>
        )}
        
        <div className="grid grid-cols-2 text-sm mt-4">
          <div className="space-y-1">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <AtSign className="h-4 w-4 text-resume-accent" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-resume-accent" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            {(personalInfo.city || personalInfo.state) && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-resume-accent" />
                <span>
                  {personalInfo.city}
                  {personalInfo.city && personalInfo.state && ", "}
                  {personalInfo.state}
                </span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-resume-accent" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-resume-accent" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-resume-blue mb-3 uppercase tracking-wide">
            Executive Summary
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-line">{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-resume-blue mb-4 uppercase tracking-wide">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {workExperience.map((job) => (
              <div key={job.id}>
                <div className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-xl">{job.position}</h4>
                    <span className="text-sm font-medium">
                      {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                    </span>
                  </div>
                  <h5 className="text-resume-accent font-semibold">
                    {job.company}
                    {job.location && `, ${job.location}`}
                  </h5>
                </div>
                <p className="text-sm mb-3 leading-relaxed">{job.description}</p>
                {job.achievements.length > 0 && (
                  <div>
                    <h6 className="font-semibold mb-2">Key Achievements:</h6>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-resume-blue mb-4 uppercase tracking-wide">
            Core Competencies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="bg-gray-50 border border-gray-200 rounded p-2 text-center"
              >
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-resume-blue mb-4 uppercase tracking-wide">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                  <h5>
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </h5>
                  {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
                  {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                </div>
                <div className="text-right">
                  <span className="text-sm">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="text-2xl font-bold text-resume-blue mb-4 uppercase tracking-wide">
            {section.title}
          </h3>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id} className="mb-4">
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
                  <h5 className="text-resume-accent font-medium mb-1">{item.subtitle}</h5>
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

export default ExecutiveTemplate;
