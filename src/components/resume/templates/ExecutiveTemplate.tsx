
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, Link as LinkIcon, MapPin, Phone, Award, Check, Briefcase, GraduationCap, Star, User } from "lucide-react";

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate = ({ data }: ExecutiveTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  return (
    <div className="executive-template bg-white shadow-sm rounded">
      {/* Header - Enhanced for better ATS parsing and visual appeal */}
      <div className="mb-8 border-b-4 border-resume-blue pb-6 pt-8 px-8">
        <h1 className="text-4xl font-bold mb-1 text-resume-blue tracking-tight">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h2 className="text-xl text-resume-blue-light mb-4 font-medium">{personalInfo.title}</h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 text-sm">
          <div className="space-y-1.5">
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
          
          <div className="space-y-1.5">
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

      <div className="px-8 pb-8">
        {/* Summary - Improved with executive focus and ATS-friendly formatting */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-resume-blue mb-3 uppercase tracking-wide border-b border-resume-blue pb-1 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Executive Summary
            </h3>
            <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {/* Work Experience - Enhanced for executive impact and ATS parsing */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-resume-blue mb-4 uppercase tracking-wide border-b border-resume-blue pb-1 flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Professional Experience
            </h3>
            <div className="space-y-6">
              {workExperience.map((job) => (
                <div key={job.id} className="mb-6">
                  <div className="mb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h4 className="font-bold text-xl text-resume-blue-light">{job.position}</h4>
                      <span className="text-sm font-medium text-gray-700 mt-1 md:mt-0 bg-gray-50 px-3 py-1 rounded">
                        {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                      </span>
                    </div>
                    <h5 className="text-resume-blue font-semibold">
                      {job.company}
                      {job.location && `, ${job.location}`}
                    </h5>
                  </div>
                  <p className="text-sm mb-3 leading-relaxed text-gray-700">{job.description}</p>
                  {job.achievements.length > 0 && (
                    <div className="mt-2">
                      <h6 className="font-semibold mb-2 text-resume-blue-light flex items-center">
                        <Award className="h-4 w-4 mr-1.5" /> Key Achievements
                      </h6>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 text-resume-accent mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{achievement}</span>
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

        {/* Skills - Reorganized for better ATS scanning */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-resume-blue mb-4 uppercase tracking-wide border-b border-resume-blue pb-1 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Core Competencies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
              {skills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="bg-gray-50 border border-gray-200 rounded p-2.5 text-center"
                >
                  <span className="text-sm font-medium text-resume-blue-light">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education - Enhanced for ATS compliance */}
        {education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-resume-blue mb-4 uppercase tracking-wide border-b border-resume-blue pb-1 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col md:flex-row md:justify-between">
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg text-resume-blue-light">{edu.degree} in {edu.field}</h4>
                    <h5 className="text-resume-blue">
                      {edu.institution}
                      {edu.location && `, ${edu.location}`}
                    </h5>
                    {edu.gpa && <p className="text-sm mt-1 text-gray-700">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-sm mt-1 text-gray-700">{edu.description}</p>}
                  </div>
                  <div className="text-right mt-1 md:mt-0 md:ml-4 md:min-w-[120px]">
                    <span className="text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded inline-block">
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections - Improved for consistent ATS parsing */}
        {customSections.map((section) => (
          <div key={section.id} className="mb-8">
            <h3 className="text-2xl font-bold text-resume-blue mb-4 uppercase tracking-wide border-b border-resume-blue pb-1">
              {section.title}
            </h3>
            <div className="space-y-5">
              {section.items.map((item) => (
                <div key={item.id} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                    <h4 className="font-bold text-lg text-resume-blue-light">{item.title}</h4>
                    {(item.startDate || item.endDate) && (
                      <span className="text-sm text-gray-700 mt-1 md:mt-0 bg-gray-50 px-2 py-1 rounded inline-block">
                        {item.startDate && formatDate(item.startDate)}
                        {item.startDate && item.endDate && " - "}
                        {item.endDate && formatDate(item.endDate)}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <h5 className="text-resume-blue font-medium mb-1">{item.subtitle}</h5>
                  )}
                  {item.description && <p className="text-sm mb-2 text-gray-700">{item.description}</p>}
                  {item.bulletPoints && item.bulletPoints.length > 0 && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
                      {item.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-resume-accent mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{point}</span>
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
    </div>
  );
};

export default ExecutiveTemplate;
