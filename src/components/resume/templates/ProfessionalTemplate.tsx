
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, MapPin, Phone, Link as LinkIcon, Check } from "lucide-react";

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const ProfessionalTemplate = ({ data }: ProfessionalTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  return (
    <div className="professional-template bg-white">
      {/* Header with horizontal stripes */}
      <div className="relative pt-6 pb-6 px-8 mb-6">
        <div className="absolute top-0 left-0 right-0 h-2 bg-resume-blue"></div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-resume-blue tracking-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.title && (
              <h2 className="text-xl text-resume-blue-light font-medium mt-1">
                {personalInfo.title}
              </h2>
            )}
          </div>
          <div className="text-right space-y-1">
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-1.5 text-sm">
                <span className="text-resume-text">{personalInfo.email}</span>
                <AtSign className="h-3.5 w-3.5 text-resume-accent" />
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-1.5 text-sm">
                <span className="text-resume-text">{personalInfo.phone}</span>
                <Phone className="h-3.5 w-3.5 text-resume-accent" />
              </div>
            )}
            {(personalInfo.city || personalInfo.state) && (
              <div className="flex items-center justify-end gap-1.5 text-sm">
                <span className="text-resume-text">
                  {personalInfo.city}
                  {personalInfo.city && personalInfo.state && ", "}
                  {personalInfo.state}
                </span>
                <MapPin className="h-3.5 w-3.5 text-resume-accent" />
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center justify-end gap-1.5 text-sm">
                <span className="text-resume-text">{personalInfo.linkedin}</span>
                <LinkIcon className="h-3.5 w-3.5 text-resume-accent" />
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center justify-end gap-1.5 text-sm">
                <span className="text-resume-text">{personalInfo.website}</span>
                <LinkIcon className="h-3.5 w-3.5 text-resume-accent" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-resume-blue mb-3 pb-2 border-b border-resume-border">
              Professional Profile
            </h3>
            <p className="text-sm leading-relaxed text-resume-text">{personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-resume-blue mb-4 pb-2 border-b border-resume-border">
                  Professional Experience
                </h3>
                <div className="space-y-5">
                  {workExperience.map((job) => (
                    <div key={job.id} className="mb-5">
                      <div className="mb-2">
                        <h4 className="font-bold text-resume-blue-light text-base">{job.position}</h4>
                        <div className="flex justify-between items-baseline">
                          <h5 className="text-resume-text font-medium text-sm">
                            {job.company}
                            {job.location && `, ${job.location}`}
                          </h5>
                          <span className="text-xs text-resume-gray-text">
                            {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-resume-text mb-2">{job.description}</p>
                      {job.achievements.length > 0 && (
                        <div className="mt-2">
                          <ul className="space-y-1">
                            {job.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="h-3.5 w-3.5 text-resume-accent mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm text-resume-text">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Sections in main column */}
            {customSections.map((section) => (
              <div key={section.id} className="mb-6">
                <h3 className="text-lg font-bold text-resume-blue mb-4 pb-2 border-b border-resume-border">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="mb-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="font-bold text-resume-blue-light">{item.title}</h4>
                        {(item.startDate || item.endDate) && (
                          <span className="text-xs text-resume-gray-text">
                            {item.startDate && formatDate(item.startDate)}
                            {item.startDate && item.endDate && " - "}
                            {item.endDate && formatDate(item.endDate)}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <h5 className="text-resume-text font-medium text-sm mb-1">{item.subtitle}</h5>
                      )}
                      {item.description && <p className="text-sm text-resume-text mb-2">{item.description}</p>}
                      {item.bulletPoints && item.bulletPoints.length > 0 && (
                        <ul className="space-y-1">
                          {item.bulletPoints.map((point, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-3.5 w-3.5 text-resume-accent mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm text-resume-text">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-1">
            {/* Education */}
            {education.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-resume-blue mb-4 pb-2 border-b border-resume-border">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-4">
                      <h4 className="font-bold text-resume-blue-light text-sm">{edu.degree} in {edu.field}</h4>
                      <h5 className="text-resume-text text-sm mb-1">{edu.institution}</h5>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-resume-gray-text">
                          {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                        </span>
                        {edu.gpa && <span className="text-xs text-resume-gray-text">GPA: {edu.gpa}</span>}
                      </div>
                      {edu.description && <p className="text-xs text-resume-text mt-1">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-resume-blue mb-4 pb-2 border-b border-resume-border">
                  Skills
                </h3>
                <div className="space-y-3">
                  {["expert", "advanced"].map((level) => {
                    const levelSkills = skills.filter((skill) => skill.level === level);
                    return levelSkills.length > 0 && (
                      <div key={level}>
                        <h4 className="font-medium text-sm capitalize text-resume-blue-light mb-2">{level}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {levelSkills.map((skill) => (
                            <span 
                              key={skill.id} 
                              className="bg-resume-gray text-resume-text px-2.5 py-1 rounded text-xs"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {["intermediate", "beginner"].map((level) => {
                    const levelSkills = skills.filter((skill) => skill.level === level);
                    return levelSkills.length > 0 && (
                      <div key={level}>
                        <h4 className="font-medium text-sm capitalize text-resume-blue-light mb-2">{level}</h4>
                        <div className="flex flex-wrap gap-2">
                          {levelSkills.map((skill) => (
                            <span 
                              key={skill.id} 
                              className="border border-resume-gray text-resume-text px-2.5 py-1 rounded text-xs"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
