export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
export type ExperienceLevel = "Intern" | "Junior" | "Mid" | "Senior" | "Lead";
export type JobSource = "LinkedIn" | "Indeed" | "Naukri" | "Company Site" | "Wellfound";
export type ResumeStatus = "missing" | "uploaded" | "analyzing" | "analyzed";

export interface SkillMatch {
  name: string;
  matched: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  recruiter: string;
  location: string;
  type: JobType;
  experience: ExperienceLevel;
  source: JobSource;
  postedAt: string;
  salary: string;
  matchPercent: number;
  skills: SkillMatch[];
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export interface JobFilters {
  query?: string;
  company?: string;
  source?: string;
  location?: string;
  type?: string;
  experience?: string;
  skill?: string;
  minMatch?: number;
}

export interface ResumeProfile {
  fileName: string;
  uploadedAt: string;
  strengthScore: number;
  summary: string;
  skills: string[];
  technologies: string[];
  experience: {
    title: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    school: string;
    period: string;
  }[];
  projects: {
    name: string;
    description: string;
    stack: string[];
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
}

export interface MatchAnalysis {
  jobId: string;
  matchPercent: number;
  matchedRequirements: string[];
  missingRequirements: string[];
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  skillGaps: string[];
  explanation: string;
  recommendations: string[];
}

export interface SkillGapItem {
  skill: string;
  current: number;
  required: number;
  priority: "High" | "Medium" | "Low";
  recommendation: string;
}

export interface UserProfile {
  name: string;
  email: string;
  title: string;
  location: string;
  about: string;
  headline: string;
  phone: string;
  website: string;
  preferredRoles: string[];
  preferredLocations: string[];
}

export interface DashboardStats {
  resumeStatus: ResumeStatus;
  strengthScore: number;
  averageMatch: number;
  recommended: Job[];
  recent: Job[];
}
