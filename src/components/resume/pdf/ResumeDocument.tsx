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
    backgroundColor: "#ffffff",
  },
  modernPage: {
    flexDirection: "column",
    padding: 0,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
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
    color: "#1a365d",
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
    color: "#4a5568",
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
    color: "#2a4365",
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
    color: "#4a5568",
  },
  text: {
    fontSize: 10,
    marginBottom: 6,
    lineHeight: 1.4,
    color: "#4a5568",
  },
  bulletList: {
    marginLeft: 10,
    marginBottom: 6,
  },
  bullet: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 1.4,
    color: "#4a5568",
  },
  bulletPoint: {
    width: 10,
    color: "#4a5568",
  },
  skillGroup: {
    marginBottom: 8,
  },
  skillLevel: {
    fontSize: 11,
    fontWeight: "medium",
    marginBottom: 4,
    color: "#2a4365",
  },
  skillBadge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: "2 6",
    fontSize: 9,
    margin: 2,
    color: "#4a5568",
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
    backgroundColor: "#ffffff",
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
    color: "#4a5568",
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
  minimalPage: {
    flexDirection: "column",
    padding: 40,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
  },
  minimalHeader: {
    marginBottom: 20,
    textAlign: "center",
  },
  minimalName: {
    fontSize: 24,
    fontWeight: "light",
    textTransform: "uppercase",
    fontFamily: "Inter",
    marginBottom: 4,
    color: "#1a365d",
    letterSpacing: 2,
  },
  minimalTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: "#2a4365",
    fontWeight: "normal",
    letterSpacing: 1,
  },
  minimalContactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 9,
    gap: 15,
    color: "#718096",
  },
  minimalSectionTitle: {
    fontSize: 12,
    fontWeight: "normal",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    color: "#1a365d",
  },
  creativePage: {
    flexDirection: "row",
    padding: 0,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
  },
  creativeSidebar: {
    width: "30%",
    backgroundColor: "#1a365d",
    padding: 20,
    color: "white",
  },
  creativeMain: {
    width: "70%",
    padding: 30,
    backgroundColor: "#ffffff",
  },
  creativeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  creativeInitials: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  creativeSidebarTitle: {
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
  },
  creativeSkillBar: {
    height: 4,
    marginTop: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
  },
  creativeSkillFill: {
    height: 4,
    backgroundColor: "white",
    borderRadius: 2,
  },
  professionalPage: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
  },
  professionalHeader: {
    padding: "25 30",
    borderTopWidth: 6,
    borderTopColor: "#1a365d",
    marginBottom: 15,
  },
  professionalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  professionalName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a365d",
  },
  professionalTitle: {
    fontSize: 16,
    color: "#2a4365",
    marginTop: 4,
  },
  professionalContactRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontSize: 9,
    marginBottom: 2,
  },
  professionalContent: {
    padding: "0 30 30 30",
  },
  professionalColumns: {
    flexDirection: "row",
    marginTop: 15,
  },
  professionalMainColumn: {
    width: "68%",
    paddingRight: 15,
  },
  professionalSideColumn: {
    width: "32%",
  },
  professionalSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
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
    <Document>
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
    </Document>
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
          )}
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

  const renderMinimalTemplate = () => (
    <Document>
      <Page size="A4" style={styles.minimalPage}>
        {/* Header */}
        <View style={styles.minimalHeader}>
          <Text style={styles.minimalName}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          {personalInfo.title && (
            <Text style={styles.minimalTitle}>{personalInfo.title}</Text>
          )}
          <View style={styles.minimalContactInfo}>
            {personalInfo.email && (
              <Text>Email: {personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text>Phone: {personalInfo.phone}</Text>
            )}
            {(personalInfo.city || personalInfo.state) && (
              <Text>
                Location: {personalInfo.city}
                {personalInfo.city && personalInfo.state && ", "}
                {personalInfo.state}
              </Text>
            )}
            {personalInfo.linkedin && (
              <Text>LinkedIn: {personalInfo.linkedin}</Text>
            )}
            {personalInfo.website && (
              <Text>Website: {personalInfo.website}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.minimalSectionTitle}>Profile</Text>
            <Text style={styles.text}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.minimalSectionTitle}>Experience</Text>
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
            <Text style={styles.minimalSectionTitle}>Education</Text>
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
            <Text style={styles.minimalSectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={{ ...styles.skillBadge, borderColor: "#e2e8f0", borderWidth: 1, backgroundColor: "white" }}>
                  {skill.name} {skill.level !== "beginner" && `• ${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}`}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {customSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.minimalSectionTitle}>{section.title}</Text>
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
        )}
      </Page>
    </Document>
  );

  const renderCreativeTemplate = () => (
    <Document>
      <Page size="A4" style={styles.creativePage}>
        {/* Sidebar */}
        <View style={styles.creativeSidebar}>
          <View style={styles.creativeAvatar}>
            <Text style={styles.creativeInitials}>
              {personalInfo.firstName?.charAt(0) || ""}{personalInfo.lastName?.charAt(0) || ""}
            </Text>
          </View>
          
          <View style={{ marginBottom: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 2 }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </Text>
            {personalInfo.title && (
              <Text style={{ fontSize: 10, opacity: 0.8, marginBottom: 10 }}>
                {personalInfo.title}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.creativeSidebarTitle}>Contact</Text>
            <View style={{ gap: 8 }}>
              {personalInfo.email && (
                <Text style={{ fontSize: 9, marginBottom: 4 }}>
                  Email: {personalInfo.email}
                </Text>
              )}
              {personalInfo.phone && (
                <Text style={{ fontSize: 9, marginBottom: 4 }}>
                  Phone: {personalInfo.phone}
                </Text>
              )}
              {(personalInfo.city || personalInfo.state) && (
                <Text style={{ fontSize: 9, marginBottom: 4 }}>
                  {personalInfo.city}
                  {personalInfo.city && personalInfo.state && ", "}
                  {personalInfo.state}
                </Text>
              )}
              {personalInfo.linkedin && (
                <Text style={{ fontSize: 9, marginBottom: 4 }}>
                  LinkedIn: {personalInfo.linkedin}
                </Text>
              )}
              {personalInfo.website && (
                <Text style={{ fontSize: 9, marginBottom: 4 }}>
                  Website: {personalInfo.website}
                </Text>
              )}
            </View>
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.creativeSidebarTitle}>Skills</Text>
              <View style={{ gap: 10 }}>
                {skills.map((skill, index) => (
                  <View key={index} style={{ marginBottom: 6 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                      <Text style={{ fontSize: 9 }}>{skill.name}</Text>
                      <Text style={{ fontSize: 7, opacity: 0.7, textTransform: "capitalize" }}>{skill.level}</Text>
                    </View>
                    <View style={styles.creativeSkillBar}>
                      <View style={{
                        ...styles.creativeSkillFill,
                        width: 
                          skill.level === "expert" ? "95%" :
                          skill.level === "advanced" ? "80%" :
                          skill.level === "intermediate" ? "60%" : "40%"
                      }} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.creativeSidebarTitle}>Education</Text>
              <View style={{ gap: 12 }}>
                {education.map((edu, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: "medium", marginBottom: 2 }}>
                      {edu.degree} in {edu.field}
                    </Text>
                    <Text style={{ fontSize: 8, marginBottom: 2 }}>{edu.institution}</Text>
                    <Text style={{ fontSize: 7, opacity: 0.7 }}>
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.creativeMain}>
          {/* Summary */}
          {personalInfo.summary && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#1a365d", marginBottom: 10 }}>
                About Me
              </Text>
              <Text style={styles.text}>{personalInfo.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#1a365d", marginBottom: 10 }}>
                Professional Experience
              </Text>
              <View style={{ gap: 15 }}>
                {workExperience.map((job, index) => (
                  <View key={index} style={{ marginBottom: 15, paddingLeft: 15, borderLeftWidth: 1, borderLeftColor: "#1a365d" }}>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: "#2a4365", marginBottom: 2 }}>
                      {job.position}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text style={{ fontSize: 10, color: "#4a5568" }}>
                        {job.company}, {job.location}
                      </Text>
                      <Text style={{ fontSize: 8, color: "#4a5568" }}>
                        {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                      </Text>
                    </View>
                    <Text style={styles.text}>{job.description}</Text>
                    {job.achievements.length > 0 && renderBullets(job.achievements)}
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Custom Sections */}
          {customSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#1a365d", marginBottom: 10 }}>
                {section.title}
              </Text>
              <View style={{ gap: 15 }}>
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                      <Text style={{ fontSize: 12, fontWeight: "bold", color: "#2a4365" }}>
                        {item.title}
                      </Text>
                      {(item.startDate || item.endDate) && (
                        <Text style={{ fontSize: 8, color: "#4a5568" }}>
                          {item.startDate && formatDate(item.startDate)}
                          {item.startDate && item.endDate && " - "}
                          {item.endDate && formatDate(item.endDate)}
                        </Text>
                      )}
                    </View>
                    {item.subtitle && (
                      <Text style={{ fontSize: 10, color: "#4a5568", marginBottom: 2 }}>
                        {item.subtitle}
                      </Text>
                    )}
                    {item.description && <Text style={styles.text}>{item.description}</Text>}
                    {item.bulletPoints && item.bulletPoints.length > 0 && renderBullets(item.bulletPoints)}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );

  const renderProfessionalTemplate = () => (
    <Document>
      <Page size="A4" style={styles.professionalPage}>
        {/* Header with horizontal stripes */}
        <View style={styles.professionalHeader}>
          <View style={styles.professionalHeaderRow}>
            <View>
              <Text style={styles.professionalName}>
                {personalInfo.firstName} {personalInfo.lastName}
              </Text>
              {personalInfo.title && (
                <Text style={styles.professionalTitle}>{personalInfo.title}</Text>
              )}
            </View>
            <View>
              {personalInfo.email && (
                <View style={styles.professionalContactRow}>
                  <Text style={{ marginRight: 5, color: "#4a5568" }}>{personalInfo.email}</Text>
                </View>
              )}
              {personalInfo.phone && (
                <View style={styles.professionalContactRow}>
                  <Text style={{ marginRight: 5, color: "#4a5568" }}>{personalInfo.phone}</Text>
                </View>
              )}
              {(personalInfo.city || personalInfo.state) && (
                <View style={styles.professionalContactRow}>
                  <Text style={{ marginRight: 5, color: "#4a5568" }}>
                    {personalInfo.city}
                    {personalInfo.city && personalInfo.state && ", "}
                    {personalInfo.state}
                  </Text>
                </View>
              )}
              {personalInfo.linkedin && (
                <View style={styles.professionalContactRow}>
                  <Text style={{ marginRight: 5, color: "#4a5568" }}>{personalInfo.linkedin}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.professionalContent}>
          {/* Summary */}
          {personalInfo.summary && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.professionalSectionTitle}>Professional Profile</Text>
              <Text style={styles.text}>{personalInfo.summary}</Text>
            </View>
          )}

          <View style={styles.professionalColumns}>
            <View style={styles.professionalMainColumn}>
              {/* Work Experience */}
              {workExperience.length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text style={styles.professionalSectionTitle}>Professional Experience</Text>
                  {workExperience.map((job, index) => (
                    <View key={index} style={{ marginBottom: 12 }}>
                      <Text style={styles.jobTitle}>{job.position}</Text>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                        <Text style={styles.jobSubtitle}>
                          {job.company}, {job.location}
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

              {/* Custom Sections */}
              {customSections.map((section, sectionIndex) => (
                <View key={sectionIndex} style={{ marginBottom: 15 }}>
                  <Text style={styles.professionalSectionTitle}>{section.title}</Text>
                  {section.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={{ marginBottom: 10 }}>
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

            <View style={styles.professionalSideColumn}>
              {/* Education */}
              {education.length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text style={styles.professionalSectionTitle}>Education</Text>
                  {education.map((edu, index) => (
                    <View key={index} style={{ marginBottom: 10 }}>
                      <Text style={{ ...styles.jobTitle, fontSize: 11 }}>{edu.degree} in {edu.field}</Text>
                      <Text style={{ ...styles.jobSubtitle, fontSize: 10 }}>{edu.institution}</Text>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                        <Text style={styles.jobDate}>
                          {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                        </Text>
                        {edu.gpa && <Text style={styles.jobDate}>GPA: {edu.gpa}</Text>}
                      </View>
                      {edu.description && <Text style={{ ...styles.text, fontSize: 9 }}>{edu.description}</Text>}
                    </View>
                  ))}
                </View>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text style={styles.professionalSectionTitle}>Skills</Text>
                  {["expert", "advanced"].map((level) => {
                    const levelSkills = skills.filter((skill) => skill.level === level);
                    return levelSkills.length > 0 ? (
                      <View key={level} style={{ marginBottom: 10 }}>
                        <Text style={{ ...styles.skillLevel, fontSize: 10 }}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Text>
                        <View style={styles.skillsContainer}>
                          {levelSkills.map((skill, index) => (
                            <Text key={index} style={{ ...styles.skillBadge, backgroundColor: "#f8fafc" }}>
                              {skill.name}
                            </Text>
                          ))}
                        </View>
                      </View>
                    ) : null;
                  })}

                  {["intermediate", "beginner"].map((level) => {
                    const levelSkills = skills.filter((skill) => skill.level === level);
                    return levelSkills.length > 0 ? (
                      <View key={level} style={{ marginBottom: 8 }}>
                        <Text style={{ ...styles.skillLevel, fontSize: 10 }}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Text>
                        <View style={styles.skillsContainer}>
                          {levelSkills.map((skill, index) => (
                            <Text key={index} style={{ ...styles.skillBadge, backgroundColor: "white", borderWidth: 1, borderColor: "#e2e8f0" }}>
                              {skill.name}
                            </Text>
                          ))}
                        </View>
                      </View>
                    ) : null;
                  })}
                </View>
              )}
            </View>
          </View>
        </View>
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
    case "minimal":
      return renderMinimalTemplate();
    case "creative":
      return renderCreativeTemplate();
    case "professional":
      return renderProfessionalTemplate();
    default:
      return renderClassicTemplate();
  }
};
