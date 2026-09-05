import { dashboardStats, jobs, matchAnalyses, resumeProfile, skillGaps } from "@/data/mock";
import type { Job, JobFilters, MatchAnalysis } from "@/lib/types";

const delay = (ms = 420) => new Promise((resolve) => setTimeout(resolve, ms));

function matchesFilters(job: Job, filters: JobFilters = {}) {
  const query = filters.query?.trim().toLowerCase();
  if (query) {
    const haystack = `${job.title} ${job.company} ${job.recruiter} ${job.location}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  if (filters.company && job.company !== filters.company) return false;
  if (filters.source && job.source !== filters.source) return false;
  if (filters.location && job.location !== filters.location) return false;
  if (filters.type && job.type !== filters.type) return false;
  if (filters.experience && job.experience !== filters.experience) return false;
  if (filters.skill && !job.skills.some((skill) => skill.name === filters.skill)) return false;
  if (typeof filters.minMatch === "number" && job.matchPercent < filters.minMatch) return false;
  return true;
}

/** Replace with GET /api/dashboard */
export async function getDashboard() {
  await delay();
  return dashboardStats;
}

/** Replace with GET /api/jobs */
export async function getJobs(filters: JobFilters = {}) {
  await delay();
  return jobs.filter((job) => matchesFilters(job, filters));
}

/** Replace with GET /api/jobs/:id */
export async function getJob(id: string) {
  await delay();
  return jobs.find((job) => job.id === id) ?? null;
}

/** Replace with GET /api/resume */
export async function getResume() {
  await delay();
  return resumeProfile;
}

/** Replace with POST /api/resume/analyze */
export async function analyzeResume(fileName: string) {
  await delay(1400);
  return { ...resumeProfile, fileName };
}

/** Replace with GET /api/jobs/:id/match */
export async function getMatchAnalysis(jobId: string): Promise<MatchAnalysis | null> {
  await delay();
  const job = jobs.find((item) => item.id === jobId);
  if (!job) return null;
  return (
    matchAnalyses[jobId] ?? {
      jobId,
      matchPercent: job.matchPercent,
      matchedRequirements: job.requirements.slice(0, Math.max(1, job.requirements.length - 1)),
      missingRequirements: job.requirements.slice(-1),
      matchedSkills: job.skills.filter((skill) => skill.matched).map((skill) => skill.name),
      missingSkills: job.skills.filter((skill) => !skill.matched).map((skill) => skill.name),
      strengths: ["Relevant core skills appear on the resume", "Experience level is in range"],
      skillGaps: job.skills.filter((skill) => !skill.matched).map((skill) => skill.name),
      explanation: `CareerLens compared your resume against ${job.title} at ${job.company}. The ${job.matchPercent}% score reflects overlapping skills and a few missing tools called out in the description.`,
      recommendations: [
        `Prioritize ${job.skills.find((skill) => !skill.matched)?.name ?? "missing tools"} on the resume.`,
        "Add quantified impact to the most relevant role.",
        "Mirror the job's seniority language in your summary.",
      ],
    }
  );
}

/** Replace with GET /api/skill-gaps */
export async function getSkillGaps() {
  await delay();
  return skillGaps;
}
