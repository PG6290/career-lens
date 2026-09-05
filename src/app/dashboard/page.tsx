"use client";

import Link from "next/link";
import { JobCard } from "@/components/jobs/JobCard";
import { AppShell, ErrorState, MatchRing, Spinner } from "@/components/layout/AppShell";
import { useClientFetch } from "@/hooks/useClientFetch";
import { getDashboard } from "@/lib/api";

export default function DashboardPage() {
  const { data, error, reload } = useClientFetch(getDashboard, "dashboard");

  return (
    <AppShell kicker="Overview" title="Dashboard" action={<Link className="btn btn-primary" href="/jobs">Find jobs</Link>}>
      {!data && !error ? <Spinner label="Building your hiring snapshot…" /> : null}
      {error ? <ErrorState onRetry={reload} /> : null}
      {data ? (
        <div className="grid">
          <section className="card welcome">
            <div>
              <p className="page-kicker">Welcome back</p>
              <h2 style={{ fontSize: 30, letterSpacing: "-0.04em", margin: "6px 0 8px" }}>Aarav, your next role is in focus.</h2>
              <p className="muted">
                CareerLens compared your analyzed resume against the latest scraped jobs. Start with the 87% Google
                match, then close Docker and Kubernetes gaps.
              </p>
            </div>
            <Link className="btn btn-primary" href="/resume">
              Update resume
            </Link>
          </section>

          <section className="grid grid-4">
            <article className="card stat">
              <p className="muted">Resume status</p>
              <b>Analyzed</b>
              <p className="soft">Aarav_Mehta_Resume.pdf</p>
            </article>
            <article className="card stat">
              <p className="muted">Resume strength</p>
              <b>{data.strengthScore}/100</b>
              <div className="progress" style={{ marginTop: 10, width: 140 }}>
                <span style={{ width: `${data.strengthScore}%` }} />
              </div>
            </article>
            <article className="card stat">
              <p className="muted">Average match</p>
              <b>{data.averageMatch}%</b>
              <p className="soft">Across live scraped roles</p>
            </article>
            <article className="card stat" style={{ display: "grid", placeItems: "center" }}>
              <MatchRing score={data.averageMatch} label="Avg fit" />
            </article>
          </section>

          <section>
            <div className="topbar">
              <h3 className="section-title">Recommended jobs</h3>
              <Link className="muted" href="/jobs">
                View feed →
              </Link>
            </div>
            <div className="grid">
              {data.recommended.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="section-title">Recently scraped jobs</h3>
            <div className="grid">
              {data.recent.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
