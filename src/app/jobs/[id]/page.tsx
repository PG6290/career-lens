"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppShell, ErrorState, MatchBadge, SkillPills, Spinner } from "@/components/layout/AppShell";
import { getJob } from "@/lib/api";
import { timeAgo } from "@/lib/format";
import type { Job } from "@/lib/types";

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null | undefined>(undefined);

  useEffect(() => {
    getJob(id).then(setJob).catch(() => setJob(null));
  }, [id]);

  return (
    <AppShell kicker="Role" title={job?.title ?? "Job details"}>
      {job === undefined ? <Spinner label="Opening job details…" /> : null}
      {job === null ? (
        <ErrorState message="This job is no longer in the feed." />
      ) : null}
      {job ? (
        <div className="grid grid-2">
          <section className="card card-pad grid">
            <div className="job-head">
              <div className="company-row">
                <div className="avatar lg">{job.company.slice(0, 1)}</div>
                <div>
                  <h2>{job.title}</h2>
                  <p className="muted">
                    {job.company} • {job.location} • {job.type}
                  </p>
                  <p className="meta-row" style={{ marginTop: 8 }}>
                    <span>{job.recruiter}</span>
                    <span>{job.experience}</span>
                    <span>{job.source}</span>
                    <span>{timeAgo(job.postedAt)}</span>
                  </p>
                </div>
              </div>
              <MatchBadge score={job.matchPercent} />
            </div>
            <p>{job.description}</p>
            <SkillPills skills={job.skills} />
            <div className="actions">
              <Link className="btn btn-primary" href={`/jobs/${job.id}/match`}>
                Resume match analysis
              </Link>
              <button className="btn btn-success" type="button">
                Apply
              </button>
            </div>
          </section>
          <aside className="grid">
            <section className="card card-pad">
              <h3 className="section-title">Requirements</h3>
              <ul className="list">
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="card card-pad">
              <h3 className="section-title">Responsibilities</h3>
              <ul className="list">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="card card-pad">
              <h3 className="section-title">Benefits</h3>
              <div className="pills">
                {job.benefits.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      ) : null}
    </AppShell>
  );
}
