"use client";

import { AppShell, ErrorState, Spinner } from "@/components/layout/AppShell";
import { useClientFetch } from "@/hooks/useClientFetch";
import { getSkillGaps } from "@/lib/api";

export default function SkillGapPage() {
  const { data: items, error, reload } = useClientFetch(getSkillGaps, "gaps");

  return (
    <AppShell kicker="Growth" title="Skill gap analysis">
      {!items && !error ? <Spinner label="Mapping your skills against target roles…" /> : null}
      {error ? <ErrorState onRetry={reload} /> : null}
      {items ? (
        <div className="grid">
          <section className="card card-pad">
            <p className="muted">
              Gaps are inferred from your analyzed resume versus recommended jobs. High-priority items appear most
              often in roles above 70% match.
            </p>
          </section>
          {items.map((item) => (
            <article className="card card-pad" key={item.skill}>
              <div className="job-head">
                <div>
                  <h3>{item.skill}</h3>
                  <p className="muted">
                    Current {item.current}% · roles typically want {item.required}%
                  </p>
                </div>
                <span className={`priority ${item.priority}`}>{item.priority}</span>
              </div>
              <div className="gap-bar" style={{ margin: "14px 0" }}>
                <span className="current" style={{ width: `${item.current}%` }} />
                <span className="required" style={{ left: `${item.required}%` }} />
              </div>
              <p>{item.recommendation}</p>
            </article>
          ))}
        </div>
      ) : null}
    </AppShell>
  );
}
