"use client";

import Link from "next/link";
import { IconExternal } from "@/components/icons";
import { MatchBadge, SkillPills } from "@/components/layout/AppShell";
import { timeAgo } from "@/lib/format";
import type { Job } from "@/lib/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="card job-card">
      <div className="job-head">
        <div className="company-row">
          <div className="avatar">{job.company.slice(0, 1)}</div>
          <div>
            <h3>{job.title}</h3>
            <p className="muted">
              {job.company} • {job.location} • {job.type}
            </p>
          </div>
        </div>
        <MatchBadge score={job.matchPercent} />
      </div>
      <p className="meta-row">
        <span>{job.recruiter}</span>
        <span>{job.experience}</span>
        <span>{job.source}</span>
        <span>{timeAgo(job.postedAt)}</span>
        <span>{job.salary}</span>
      </p>
      <SkillPills skills={job.skills} />
      <div className="actions">
        <Link className="btn btn-primary" href={`/jobs/${job.id}/match`}>
          View Match
        </Link>
        <Link className="btn btn-ghost" href={`/jobs/${job.id}`}>
          Details
        </Link>
        <a className="btn btn-success" href="#apply" onClick={(e) => e.preventDefault()}>
          Apply <IconExternal width={16} height={16} />
        </a>
      </div>
    </article>
  );
}
