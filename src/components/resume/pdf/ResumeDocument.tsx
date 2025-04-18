import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { ResumeData, ResumeTemplate } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@4.5.0/files/inter-latin-400-normal.woff", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@4.5.0/files/inter-latin-500-normal.woff", fontWeight: 500 },
    { src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@4.5.0/files/inter-latin-600-normal.woff", fontWeight: 600 },
    { src: "https://cdn.jsdelivr.net/npm/@fontsource/inter@4.5.0/files/inter-latin-700-normal.woff", fontWeight: 700 },
  ],
});

Font.register({
  family: "Merriweather",
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/@fontsource/merriweather@4.5.0/files/merriweather-latin-400-normal.woff", fontWeight: 400 },
    { src: "https://cdn.jsdelivr.net/npm/@fontsource/merriweather@4.5.0/files/merriweather-latin-700-normal.woff", fontWeight: 700 },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontFamily: "Inter",
  },
  modernPage: {
    flexDirection: "column",
    padding: 0,
    fontFamily: "Inter",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Merriweather",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: "#2a4365",
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 10,
    gap: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Merriweather",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#1a365d",
    color: "#1a365d",
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  jobSubtitle: {
    fontSize: 11,
    fontWeight: "medium",
    color: "#2a4365",
    marginBottom: 4,
  },
  jobDate: {
    fontSize: 10,
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  bulletList: {
    marginLeft: 10,
    marginBottom: 6,
  },
  bullet: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  bulletPoint: {
    width: 10,
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillLevel: {
    fontSize: 11,
    fontWeight: "medium",
    marginBottom: 4,
  },
  skillBadge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: "2 6",
    fontSize: 9,
    margin: 2,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  section: {
    marginBottom: 12,
  },
  entry: {
    marginBottom: 8,
  },
  modernHeader: {
    backgroundColor: "#1a365d",
    color: "white",
    padding: 30,
  },
  modernContent: {
    padding: 30,
  },
  modernName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: "white",
  },
  modernTitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    marginBottom: 10,
  },
  modernContactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 10,
    color: "white",
    marginTop: 15,
    gap: 10,
  },
  modernSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 8,
  },
  executiveHeader: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1a365d",
    paddingBottom: 15,
  },
  executiveName: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Merriweather",
    color: "#1a365d",
    marginBottom: 4,
  },
  executiveTitle: {
    fontSize: 16,
    color: "#2a4365",
    marginBottom: 10,
  },
  executiveContactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginTop: 10,
  },
  executiveContactCol: {
    width: "48%",
  },
  executiveSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Merriweather",
    color: "#1a365d",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

interface ResumeDocumentProps {
  template: ResumeTemplate;
  data: ResumeData;
}

export const ResumeDocument = ({ template, data }: ResumeDocumentProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  const renderContact = () => (
    <View style={styles.contactInfo}>
      {personalInfo.email && (
        <Text style={styles.contactItem}>
          Email: {personalInfo.email}
        </Text>
      )}
      {personalInfo.phone && (
        <Text style={styles.contactItem}>
          Phone: {personalInfo.phone}
        </Text>
      )}
      {(personalInfo.city || personalInfo.state) && (
        <Text style={styles.contactItem}>
          Location: {personalInfo.city}
          {personalInfo.city && personalInfo.state && ", "}
          {personalInfo.state}
        </Text>
      )}
      {personalInfo.linkedin && (
        <Text style={styles.contactItem}>
          LinkedIn: {personalInfo.linkedin}
        </Text>
      )}
      {personalInfo.website && (
        <Text style={styles.contactItem}>
          Website: {personalInfo.website}
        </Text>
      )}
    </View>
  );

  const renderModernContact = () => (
    <View style={styles.modernContactInfo}>
      {personalInfo.email && (
        <Text style={styles.contactItem}>
          Email: {personalInfo.email}
        </Text>
      )}
      {personalInfo.phone && (
        <Text style={styles.contactItem}>
          Phone: {personalInfo.phone}
        </Text>
      )}
      {(personalInfo.city || personalInfo.state) && (
        <Text style={styles.contactItem}>
          Location: {personalInfo.city}
          {personalInfo.city && personalInfo.state && ", "}
          {personalInfo.state}
        </Text>
      )}
      {personalInfo.linkedin && (
        <Text style={styles.contactItem}>
          LinkedIn: {personalInfo.linkedin}
        </Text>
      )}
      {personalInfo.website && (
        <Text style={styles.contactItem}>
          Website: {personalInfo.website}
        </Text>
      )}
    </View>
  );

  const renderExecutiveContact = () => (
    <View style={styles.executiveContactInfo}>
      <View style={styles.executiveContactCol}>
        {personalInfo.email && (
          <Text style={styles.contactItem}>
            Email: {personalInfo.email}
          </Text>
        )}
        {personalInfo.phone && (
          <Text style={styles.contactItem}>
            Phone: {personalInfo.phone}
          </Text>
        )}
      </View>
      <View style={styles.executiveContactCol}>
        {(personalInfo.city || personalInfo.state) && (
          <Text style={styles.contactItem}>
            Location: {personalInfo.city}
            {personalInfo.city && personalInfo.state && ", "}
            {personalInfo.state}
          </Text>
        )}
        {personalInfo.linkedin && (
          <Text style={styles.contactItem}>
            LinkedIn: {personalInfo.linkedin}
          </Text>
        )}
        {personalInfo.website && (
          <Text style={styles.contactItem}>
            Website: {personalInfo.website}
          </Text>
        )}
      </View>
    </View>
  );

  const renderBullets = (bullets: string[]) => (
    <View style={styles.bulletList}>
      {bullets.map((bullet, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <Text style={styles.bulletPoint}>• </Text>
          <Text style={styles.bullet}>{bullet}</Text>
        </View>
      ))}
    </View>
  );

  const renderClassicTemplate = () => (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {personalInfo.firstName} {personalInfo.lastName}
        </Text>
        {personalInfo.title && (
          <Text style={styles.title}>{personalInfo.title}</Text>
        )}
        {renderContact()}
      </View>

      {/* Summary */}
      {personalInfo.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.text}>{personalInfo.summary}</Text>
        </View>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {workExperience.map((job, index) => (
            <View key={index} style={styles.entry}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.jobTitle}>{job.position}</Text>
                <Text style={styles.jobDate}>
                  {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                </Text>
              </View>
              <Text style={styles.jobSubtitle}>
                {job.company}
                {job.location && `, ${job.location}`}
              </Text>
              <Text style={styles.text}>{job.description}</Text>
              {job.achievements.length > 0 && renderBullets(job.achievements)}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, index) => (
            <View key={index} style={styles.entry}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.jobTitle}>{edu.degree} in {edu.field}</Text>
                <Text style={styles.jobDate}>
                  {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.jobSubtitle}>
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </Text>
                {edu.gpa && <Text style={styles.jobDate}>GPA: {edu.gpa}</Text>}
              </View>
              {edu.description && <Text style={styles.text}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {["expert", "advanced", "intermediate", "beginner"].map((level) => {
            const levelSkills = skills.filter((skill) => skill.level === level);
            return levelSkills.length > 0 ? (
              <View key={level} style={styles.skillGroup}>
                <Text style={styles.skillLevel}>{level.charAt(0).toUpperCase() + level.slice(1)}</Text>
                <View style={styles.skillsContainer}>
                  {levelSkills.map((skill, index) => (
                    <Text key={index} style={styles.skillBadge}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null;
          })}
        </View>
      )}

      {/* Custom Sections */}
      {customSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.entry}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                {(item.startDate || item.endDate) && (
                  <Text style={styles.jobDate}>
                    {item.startDate && formatDate(item.startDate)}
                    {item.startDate && item.endDate && " - "}
                    {item.endDate && formatDate(item.endDate)}
                  </Text>
                )}
              </View>
              {item.subtitle && <Text style={styles.jobSubtitle}>{item.subtitle}</Text>}
              {item.description && <Text style={styles.text}>{item.description}</Text>}
              {item.bulletPoints && item.bulletPoints.length > 0 && renderBullets(item.bulletPoints)}
            </View>
          ))}
        </View>
      ))}
    </Page>
  );

  const renderModernTemplate = () => (
    <Document>
      <Page size="A4" style={styles.modernPage}>
        {/* Header */}
        <View style={styles.modernHeader}>
          <Text style={styles.modernName}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          {personalInfo.title && (
            <Text style={styles.modernTitle}>{personalInfo.title}</Text>
          )}
          {renderModernContact()}
        </View>

        <View style={styles.modernContent}>
          {/* Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.modernSectionTitle}>About Me</Text>
              <Text style={styles.text}>{personalInfo.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.modernSectionTitle}>Experience</Text>
              {workExperience.map((job, index) => (
                <View key={index} style={styles.entry}>
                  <Text style={styles.jobTitle}>{job.position}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.jobSubtitle}>
                      {job.company}
                      {job.location && `, ${job.location}`}
                    </Text>
                    <Text style={styles.jobDate}>
                      {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                    </Text>
                  </View>
                  <Text style={styles.text}>{job.description}</Text>
                  {job.achievements.length > 0 && renderBullets(job.achievements)}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.modernSectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.entry}>
                  <Text style={styles.jobTitle}>{edu.degree} in {edu.field}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.jobSubtitle}>
                      {edu.institution}
                      {edu.location && `, ${edu.location}`}
                    </Text>
                    <Text style={styles.jobDate}>
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </Text>
                  </View>
                  {edu.gpa && <Text style={styles.text}>GPA: {edu.gpa}</Text>}
                  {edu.description && <Text style={styles.text}>{edu.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.modernSectionTitle}>Skills</Text>
              {["expert", "advanced", "intermediate", "beginner"].map((level) => {
                const levelSkills = skills.filter((skill) => skill.level === level);
                return levelSkills.length > 0 ? (
                  <View key={level} style={styles.skillGroup}>
                    <Text style={styles.skillLevel}>{level.charAt(0).toUpperCase() + level.slice(1)}</Text>
                    <View style={styles.skillsContainer}>
                      {levelSkills.map((skill, index) => (
                        <Text key={index} style={styles.skillBadge}>
                          {skill.name}
                        </Text>
                      ))}
                    </View>
                  </View>
                ) : null;
              })}
            </View>
          )}

          {/* Custom Sections */}
          {customSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.modernSectionTitle}>{section.title}</Text>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.entry}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    {(item.startDate || item.endDate) && (
                      <Text style={styles.jobDate}>
                        {item.startDate && formatDate(item.startDate)}
                        {item.startDate && item.endDate && " - "}
                        {item.endDate && formatDate(item.endDate)}
                      </Text>
                    )}
                  </View>
                  {item.subtitle && <Text style={styles.jobSubtitle}>{item.subtitle}</Text>}
                  {item.description && <Text style={styles.text}>{item.description}</Text>}
                  {item.bulletPoints && item.bulletPoints.length > 0 && renderBullets(item.bulletPoints)}
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const renderExecutiveTemplate = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.executiveHeader}>
          <Text style={styles.executiveName}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          {personalInfo.title && (
            <Text style={styles.executiveTitle}>{personalInfo.title}</Text>
          )}
          {renderExecutiveContact()}
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.executiveSectionTitle}>Executive Summary</Text>
            <Text style={styles.text}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.executiveSectionTitle}>Professional Experience</Text>
            {workExperience.map((job, index) => (
              <View key={index} style={styles.entry}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={styles.jobTitle}>{job.position}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                  </Text>
                </View>
                <Text style={styles.jobSubtitle}>
                  {job.company}
                  {job.location && `, ${job.location}`}
                </Text>
                <Text style={styles.text}>{job.description}</Text>
                {job.achievements.length > 0 && (
                  <>
                    <Text style={{ ...styles.text, fontWeight: "medium" }}>Key Achievements:</Text>
                    {renderBullets(job.achievements)}
                  </>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.executiveSectionTitle}>Core Competencies</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={{ ...styles.skillBadge, margin: 4 }}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.executiveSectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.entry}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={styles.jobTitle}>{edu.degree} in {edu.field}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.jobSubtitle}>
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </Text>
                {edu.gpa && <Text style={styles.text}>GPA: {edu.gpa}</Text>}
                {edu.description && <Text style={styles.text}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {customSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.executiveSectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.entry}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  {(item.startDate || item.endDate) && (
                    <Text style={styles.jobDate}>
                      {item.startDate && formatDate(item.startDate)}
                      {item.startDate && item.endDate && " - "}
                      {item.endDate && formatDate(item.endDate)}
                    </Text>
                  )}
                </View>
                {item.subtitle && <Text style={styles.jobSubtitle}>{item.subtitle}</Text>}
                {item.description && <Text style={styles.text}>{item.description}</Text>}
                {item.bulletPoints && item.bulletPoints.length > 0 && renderBullets(item.bulletPoints)}
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );

  switch (template) {
    case "classic":
      return renderClassicTemplate();
    case "modern":
      return renderModernTemplate();
    case "executive":
      return renderExecutiveTemplate();
    default:
      return renderClassicTemplate();
  }
};
