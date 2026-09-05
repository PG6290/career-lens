"use client";

import { AppShell, ErrorState, Spinner } from "@/components/layout/AppShell";
import { useClientFetch } from "@/hooks/useClientFetch";
import { getResume } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function ResumeAnalysisPage() {
  const { data: resume, error, reload } = useClientFetch(getResume, "resume");

  return (
    <AppShell kicker="Intelligence" title="Resume analysis">
      {!resume && !error ? <Spinner label="Opening extracted resume profile…" /> : null}
      {error ? <ErrorState onRetry={reload} /> : null}
      {resume ? (
        <div className="grid">
          <section className="card welcome">
            <div>
              <p className="page-kicker">{resume.fileName} · uploaded {formatDate(resume.uploadedAt)}</p>
              <h2 style={{ fontSize: 28, margin: "8px 0" }}>Strength score {resume.strengthScore}/100</h2>
              <p className="muted">{resume.summary}</p>
            </div>
            <div className="progress" style={{ width: 180 }}>
              <span style={{ width: `${resume.strengthScore}%` }} />
            </div>
          </section>
          <section className="grid grid-2">
            <article className="card card-pad">
              <h3 className="section-title">Skills</h3>
              <div className="pills">
                {resume.skills.map((item) => (
                  <span className="pill ok" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Technologies</h3>
              <div className="pills">
                {resume.technologies.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Experience</h3>
              <div className="grid">
                {resume.experience.map((item) => (
                  <div className="stack-item" key={item.company}>
                    <strong>
                      {item.title} · {item.company}
                    </strong>
                    <p className="soft">{item.period}</p>
                    <ul className="muted" style={{ marginTop: 8, paddingLeft: 16 }}>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Education</h3>
              {resume.education.map((item) => (
                <div className="stack-item" key={item.school}>
                  <strong>{item.degree}</strong>
                  <p className="muted">
                    {item.school} · {item.period}
                  </p>
                </div>
              ))}
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Projects</h3>
              {resume.projects.map((item) => (
                <div className="stack-item" key={item.name} style={{ marginBottom: 10 }}>
                  <strong>{item.name}</strong>
                  <p className="muted">{item.description}</p>
                  <div className="pills" style={{ marginTop: 8 }}>
                    {item.stack.map((tech) => (
                      <span className="pill" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </article>
            <article className="card card-pad">
              <h3 className="section-title">Certifications</h3>
              {resume.certifications.map((item) => (
                <div className="stack-item" key={item.name}>
                  <strong>{item.name}</strong>
                  <p className="muted">
                    {item.issuer} · {item.year}
                  </p>
                </div>
              ))}
            </article>
          </section>
        </div>
      ) : null}
    </AppShell>
  );
}
