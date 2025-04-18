
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, GraduationCap, Link as LinkIcon, MapPin, Phone, Briefcase, Award } from "lucide-react";

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  return (
    <div className="modern-template">
      {/* Header */}
      <div className="bg-resume-blue text-white p-8 shadow-md rounded-t-md">
        <h1 className="text-3xl font-bold mb-1 tracking-tight">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl opacity-90 mb-4 font-medium">{personalInfo.title}</h2>
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

      <div className="p-8 bg-white shadow-md rounded-b-md">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Summary */}
            {personalInfo.summary && (
              <div>
                <h3 className="text-xl font-bold text-resume-blue mb-3 border-b border-resume-blue pb-1">
                  Professional Summary
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-line">{personalInfo.summary}</p>
              </div>
            )}

            {/* Work Experience */}
            {workExperience.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <Briefcase className="h-5 w-5 text-resume-blue mr-2" />
                  <h3 className="text-xl font-bold text-resume-blue border-b border-resume-blue pb-1 w-full">Professional Experience</h3>
                </div>
                <div className="space-y-6">
                  {workExperience.map((job) => (
                    <div key={job.id} className="relative pl-5 border-l-2 border-resume-blue">
                      <div className="mb-2">
                        <h4 className="font-bold text-lg">{job.position}</h4>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                          <h5 className="text-resume-blue-light font-medium">
                            {job.company}
                            {job.location && `, ${job.location}`}
                          </h5>
                          <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded mt-1 md:mt-0 inline-block">
                            {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm my-2 text-gray-700">{job.description}</p>
                      {job.achievements.length > 0 && (
                        <div className="mt-3">
                          <h6 className="text-sm font-semibold text-resume-blue mb-1 flex items-center">
                            <Award className="h-3.5 w-3.5 mr-1" />
                            Key Achievements
                          </h6>
                          <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-700">
                            {job.achievements.map((achievement, i) => (
                              <li key={i} className="pl-1">{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-5 w-5 text-resume-blue mr-2" />
                  <h3 className="text-xl font-bold text-resume-blue border-b border-resume-blue pb-1 w-full">Education</h3>
                </div>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-5 border-l-2 border-resume-blue">
                      <div className="mb-2">
                        <h4 className="font-bold text-lg">{edu.degree} in {edu.field}</h4>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                          <h5 className="text-resume-blue-light font-medium">
                            {edu.institution}
                            {edu.location && `, ${edu.location}`}
                          </h5>
                          <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded mt-1 md:mt-0 inline-block">
                            {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                          </span>
                        </div>
                      </div>
                      {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                      {edu.description && <p className="text-sm mt-2 text-gray-700">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Sections */}
            {customSections.map((section) => (
              <div key={section.id}>
                <h3 className="text-xl font-bold text-resume-blue mb-4 border-b border-resume-blue pb-1">
                  {section.title}
                </h3>
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div key={item.id} className="relative pl-5 border-l-2 border-resume-blue">
                      <div className="mb-2">
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                          {item.subtitle && (
                            <h5 className="text-resume-blue-light font-medium">
                              {item.subtitle}
                            </h5>
                          )}
                          {(item.startDate || item.endDate) && (
                            <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded mt-1 md:mt-0 inline-block">
                              {item.startDate && formatDate(item.startDate)}
                              {item.startDate && item.endDate && " - "}
                              {item.endDate && formatDate(item.endDate)}
                            </span>
                          )}
                        </div>
                      </div>
                      {item.description && <p className="text-sm my-2 text-gray-700">{item.description}</p>}
                      {item.bulletPoints && item.bulletPoints.length > 0 && (
                        <ul className="list-disc list-inside text-sm ml-2 space-y-1.5 text-gray-700">
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

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-resume-blue mb-4 border-b border-resume-blue pb-1">
                  Technical Skills
                </h3>
                <div className="space-y-5">
                  {["expert", "advanced", "intermediate", "beginner"].map((level) => {
                    const levelSkills = skills.filter((skill) => skill.level === level);
                    return levelSkills.length > 0 && (
                      <div key={level}>
                        <h4 className="font-medium capitalize text-sm mb-2 text-resume-blue-light">
                          {level} Proficiency
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {levelSkills.map((skill) => (
                            <span 
                              key={skill.id} 
                              className="inline-block bg-white border border-resume-blue text-resume-blue rounded-full px-3 py-1 text-xs font-medium"
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

export default ModernTemplate;
