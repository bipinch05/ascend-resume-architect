
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, GraduationCap, Link as LinkIcon, MapPin, Phone, Briefcase } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  return (
    <div className="modern-template">
      {/* Header */}
      <div className="bg-resume-blue text-white p-8">
        <h1 className="text-3xl font-bold mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl opacity-90 mb-4">{personalInfo.title}</h2>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm mt-6">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <AtSign className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>
                {personalInfo.city}
                {personalInfo.city && personalInfo.state && ", "}
                {personalInfo.state}
              </span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="h-4 w-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="h-4 w-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h3 className="text-xl font-bold text-resume-blue mb-3">
                About Me
              </h3>
              <p className="text-sm whitespace-pre-line">{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <div className="flex items-center mb-3">
                <Briefcase className="h-5 w-5 text-resume-accent mr-2" />
                <h3 className="text-xl font-bold text-resume-blue">Experience</h3>
              </div>
              <div className="space-y-5">
                {workExperience.map((job) => (
                  <div key={job.id} className="border-l-2 border-resume-accent pl-4">
                    <div className="mb-1">
                      <h4 className="font-bold text-lg">{job.position}</h4>
                      <div className="flex justify-between items-baseline">
                        <h5 className="text-resume-blue-light font-medium">
                          {job.company}
                          {job.location && `, ${job.location}`}
                        </h5>
                        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                          {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm my-2">{job.description}</p>
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
            <div>
              <div className="flex items-center mb-3">
                <GraduationCap className="h-5 w-5 text-resume-accent mr-2" />
                <h3 className="text-xl font-bold text-resume-blue">Education</h3>
              </div>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-resume-accent pl-4">
                    <div className="mb-1">
                      <h4 className="font-bold text-lg">{edu.degree} in {edu.field}</h4>
                      <div className="flex justify-between items-baseline">
                        <h5 className="text-resume-blue-light font-medium">
                          {edu.institution}
                          {edu.location && `, ${edu.location}`}
                        </h5>
                        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                          {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>
                    {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Sections */}
          {customSections.map((section) => (
            <div key={section.id}>
              <h3 className="text-xl font-bold text-resume-blue mb-3">
                {section.title}
              </h3>
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div key={item.id} className="border-l-2 border-resume-accent pl-4">
                    <div className="mb-1">
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      {item.subtitle && (
                        <h5 className="text-resume-blue-light font-medium">
                          {item.subtitle}
                        </h5>
                      )}
                      {(item.startDate || item.endDate) && (
                        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                          {item.startDate && formatDate(item.startDate)}
                          {item.startDate && item.endDate && " - "}
                          {item.endDate && formatDate(item.endDate)}
                        </span>
                      )}
                    </div>
                    {item.description && <p className="text-sm my-2">{item.description}</p>}
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

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-resume-blue mb-3">
                Skills
              </h3>
              <div className="space-y-4">
                {["expert", "advanced", "intermediate", "beginner"].map((level) => {
                  const levelSkills = skills.filter((skill) => skill.level === level);
                  return levelSkills.length > 0 && (
                    <div key={level}>
                      <h4 className="font-medium capitalize text-sm mb-2">{level}</h4>
                      <div className="flex flex-wrap gap-2">
                        {levelSkills.map((skill) => (
                          <span 
                            key={skill.id} 
                            className="inline-block bg-resume-accent text-white rounded-full px-3 py-1 text-xs"
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
  );
};

export default ModernTemplate;
