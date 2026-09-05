"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppShell, ErrorState, MatchRing, Spinner } from "@/components/layout/AppShell";
import { getJob, getMatchAnalysis } from "@/lib/api";
import type { Job, MatchAnalysis } from "@/lib/types";

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [match, setMatch] = useState<MatchAnalysis | null | undefined>(undefined);

  useEffect(() => {
    Promise.all([getJob(id), getMatchAnalysis(id)])
      .then(([nextJob, nextMatch]) => {
        setJob(nextJob);
        setMatch(nextMatch);
      })
      .catch(() => setMatch(null));
  }, [id]);

  return (
    <AppShell kicker="AI match" title="Resume match analysis">
      {match === undefined ? <Spinner label="Comparing your resume to this role…" /> : null}
      {match === null ? <ErrorState message="Match analysis is unavailable for this job." /> : null}
      {match && job ? (
        <div className="grid">
          <section className="card welcome">
            <div>
              <p className="page-kicker">
                {job.title} · {job.company} · {job.location} · {job.type}
              </p>
              <h2 style={{ fontSize: 32, margin: "8px 0" }}>You are a {match.matchPercent}% match.</h2>
              <p className="muted">{match.explanation}</p>
              <div className="actions" style={{ marginTop: 16 }}>
                <Link className="btn btn-ghost" href={`/jobs/${job.id}`}>
                  Back to job
                </Link>
                <Link className="btn btn-primary" href="/skill-gap">
                  Open skill gap plan
                </Link>
              </div>
            </div>
            <MatchRing score={match.matchPercent} label="Fit score" />
          </section>

          <section className="grid grid-2">
            <article className="card card-pad">
              <h3 className="section-title">Matched requirements</h3>
              <ul className="list">
                {match.matchedRequirements.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Missing requirements</h3>
              <ul className="list">
                {match.missingRequirements.map((item) => (
                  <li key={item}>✗ {item}</li>
                ))}
              </ul>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Matched skills</h3>
              <div className="pills">
                {match.matchedSkills.map((item) => (
                  <span className="pill ok" key={item}>
                    ✓ {item}
                  </span>
                ))}
              </div>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Missing skills</h3>
              <div className="pills">
                {match.missingSkills.map((item) => (
                  <span className="pill miss" key={item}>
                    ✗ {item}
                  </span>
                ))}
              </div>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Strengths</h3>
              <ul className="list">
                {match.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Skill gaps</h3>
              <ul className="list">
                {match.skillGaps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="grid grid-2">
            <article className="card card-pad">
              <h3 className="section-title">AI explanation</h3>
              <p className="muted">{match.explanation}</p>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">AI recommendations</h3>
              <ul className="list">
                {match.recommendations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
