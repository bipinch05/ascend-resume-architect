
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, MapPin, Phone, Link as LinkIcon, Star } from "lucide-react";

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  return (
    <div className="creative-template bg-white h-full">
      {/* Left sidebar */}
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-4 bg-resume-blue p-6 text-white h-full">
          <div className="mb-8 text-center">
            <div className="w-32 h-32 rounded-full bg-white/10 mx-auto mb-4 flex items-center justify-center">
              <h1 className="text-4xl font-bold">
                {personalInfo.firstName?.charAt(0) || ""}{personalInfo.lastName?.charAt(0) || ""}
              </h1>
            </div>
            <h2 className="text-xl font-semibold mb-1">
              {personalInfo.firstName} {personalInfo.lastName}
            </h2>
            {personalInfo.title && (
              <p className="text-sm text-white/80 font-light">{personalInfo.title}</p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-1">Contact</h3>
            <div className="space-y-2">
              {personalInfo.email && (
                <div className="flex items-center gap-3 text-sm">
                  <AtSign className="h-4 w-4 text-white/70" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-white/70" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {(personalInfo.city || personalInfo.state) && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-white/70" />
                  <span>
                    {personalInfo.city}
                    {personalInfo.city && personalInfo.state && ", "}
                    {personalInfo.state}
                  </span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-3 text-sm">
                  <LinkIcon className="h-4 w-4 text-white/70" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-3 text-sm">
                  <LinkIcon className="h-4 w-4 text-white/70" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-1">Skills</h3>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="text-white/70 capitalize text-xs">{skill.level}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div 
                      className="bg-white h-1.5 rounded-full" 
                      style={{ 
                        width: 
                          skill.level === "expert" ? "95%" :
                          skill.level === "advanced" ? "80%" :
                          skill.level === "intermediate" ? "60%" : "40%" 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education in sidebar */}
          {education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-1">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <h4 className="font-medium text-sm">{edu.degree} in {edu.field}</h4>
                    <p className="text-xs text-white/80 mb-1">{edu.institution}</p>
                    <p className="text-xs text-white/70">
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-8 p-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-resume-blue border-b-2 border-resume-blue-light/30 pb-1 flex items-center">
                <Star className="h-5 w-5 mr-2 text-resume-blue-light" />
                About Me
              </h3>
              <p className="text-sm leading-relaxed text-resume-text">{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-resume-blue border-b-2 border-resume-blue-light/30 pb-1">
                Professional Experience
              </h3>
              <div className="space-y-6">
                {workExperience.map((job) => (
                  <div key={job.id} className="mb-4 relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-resume-blue-light/20">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-resume-blue-light"></div>
                    <h4 className="font-bold text-resume-blue-light">{job.position}</h4>
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-resume-gray-text font-medium text-sm">
                        {job.company}
                        {job.location && `, ${job.location}`}
                      </h5>
                      <span className="text-xs text-resume-gray-text bg-resume-gray py-0.5 px-2 rounded">
                        {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                      </span>
                    </div>
                    <p className="text-sm text-resume-text mb-2">{job.description}</p>
                    {job.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-sm space-y-1 text-resume-text">
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

          {/* Custom Sections */}
          {customSections.map((section) => (
            <div key={section.id} className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-resume-blue border-b-2 border-resume-blue-light/30 pb-1">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
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
                      <h5 className="text-resume-gray-text font-medium text-sm mb-1">{item.subtitle}</h5>
                    )}
                    {item.description && <p className="text-sm text-resume-text mb-2">{item.description}</p>}
                    {item.bulletPoints && item.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside text-sm space-y-1 text-resume-text">
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
      </div>
    </div>
  );
};

export default CreativeTemplate;
