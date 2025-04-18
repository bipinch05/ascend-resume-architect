import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ResumeTemplate = 'classic' | 'modern' | 'executive';

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  title: string;
  summary: string;
  linkedin?: string;
  website?: string;
};

export type WorkExperience = {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  gpa?: string;
};

export type Skill = {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
};

export type CustomSection = {
  id: string;
  title: string;
  items: CustomSectionItem[];
};

export type CustomSectionItem = {
  id: string;
  title: string;
  subtitle?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  bulletPoints?: string[];
};

export type ResumeData = {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  customSections: CustomSection[];
};

export type ResumeColors = {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
};

interface ResumeState {
  currentStep: number;
  template: ResumeTemplate;
  colors: ResumeColors;
  data: ResumeData;
  lastSaved: string | null;
  setStep: (step: number) => void;
  setTemplate: (template: ResumeTemplate) => void;
  setColors: (colors: Partial<ResumeColors>) => void;
  updatePersonalInfo: (personalInfo: Partial<PersonalInfo>) => void;
  addWorkExperience: (workExperience: Omit<WorkExperience, 'id'>) => void;
  updateWorkExperience: (id: string, workExperience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addCustomSection: (title: string) => void;
  updateCustomSection: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string, item: Omit<CustomSectionItem, 'id'>) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<CustomSectionItem>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  resetStore: () => void;
}

const defaultColors: ResumeColors = {
  primary: '#1a365d',
  secondary: '#2a4365',
  accent: '#3182ce',
  text: '#1a202c',
  background: '#ffffff',
};

const defaultPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  title: '',
  summary: '',
  linkedin: '',
  website: '',
};

const initialState = {
  currentStep: 0,
  template: 'classic' as ResumeTemplate,
  colors: defaultColors,
  data: {
    personalInfo: defaultPersonalInfo,
    workExperience: [],
    education: [],
    skills: [],
    customSections: [],
  },
  lastSaved: null,
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setStep: (step) => set({ currentStep: step }),
      
      setTemplate: (template) => set({ template }),
      
      setColors: (colors) => set((state) => ({ 
        colors: { ...state.colors, ...colors } 
      })),
      
      updatePersonalInfo: (personalInfo) => set((state) => ({
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...personalInfo },
        },
        lastSaved: new Date().toISOString(),
      })),
      
      addWorkExperience: (workExperience) => set((state) => {
        const newId = generateId();
        return {
          data: {
            ...state.data,
            workExperience: [
              ...state.data.workExperience,
              { ...workExperience, id: newId },
            ],
          },
          lastSaved: new Date().toISOString(),
        };
      }),
      
      updateWorkExperience: (id, workExperience) => set((state) => ({
        data: {
          ...state.data,
          workExperience: state.data.workExperience.map((item) =>
            item.id === id ? { ...item, ...workExperience } : item
          ),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      removeWorkExperience: (id) => set((state) => ({
        data: {
          ...state.data,
          workExperience: state.data.workExperience.filter((item) => item.id !== id),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      addEducation: (education) => set((state) => ({
        data: {
          ...state.data,
          education: [
            ...state.data.education,
            { ...education, id: generateId() },
          ],
        },
        lastSaved: new Date().toISOString(),
      })),
      
      updateEducation: (id, education) => set((state) => ({
        data: {
          ...state.data,
          education: state.data.education.map((item) =>
            item.id === id ? { ...item, ...education } : item
          ),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      removeEducation: (id) => set((state) => ({
        data: {
          ...state.data,
          education: state.data.education.filter((item) => item.id !== id),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      addSkill: (skill) => set((state) => ({
        data: {
          ...state.data,
          skills: [
            ...state.data.skills,
            { ...skill, id: generateId() },
          ],
        },
        lastSaved: new Date().toISOString(),
      })),
      
      updateSkill: (id, skill) => set((state) => ({
        data: {
          ...state.data,
          skills: state.data.skills.map((item) =>
            item.id === id ? { ...item, ...skill } : item
          ),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      removeSkill: (id) => set((state) => ({
        data: {
          ...state.data,
          skills: state.data.skills.filter((item) => item.id !== id),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      addCustomSection: (title) => set((state) => ({
        data: {
          ...state.data,
          customSections: [
            ...state.data.customSections,
            { id: generateId(), title, items: [] },
          ],
        },
        lastSaved: new Date().toISOString(),
      })),
      
      updateCustomSection: (id, title) => set((state) => ({
        data: {
          ...state.data,
          customSections: state.data.customSections.map((section) =>
            section.id === id ? { ...section, title } : section
          ),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      removeCustomSection: (id) => set((state) => ({
        data: {
          ...state.data,
          customSections: state.data.customSections.filter((section) => section.id !== id),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      addCustomSectionItem: (sectionId, item) => set((state) => ({
        data: {
          ...state.data,
          customSections: state.data.customSections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  items: [...section.items, { ...item, id: generateId() }],
                }
              : section
          ),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      updateCustomSectionItem: (sectionId, itemId, item) => set((state) => ({
        data: {
          ...state.data,
          customSections: state.data.customSections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  items: section.items.map((sectionItem) =>
                    sectionItem.id === itemId
                      ? { ...sectionItem, ...item }
                      : sectionItem
                  ),
                }
              : section
          ),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      removeCustomSectionItem: (sectionId, itemId) => set((state) => ({
        data: {
          ...state.data,
          customSections: state.data.customSections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  items: section.items.filter((item) => item.id !== itemId),
                }
              : section
          ),
        },
        lastSaved: new Date().toISOString(),
      })),
      
      resetStore: () => set({ ...initialState, lastSaved: new Date().toISOString() }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
