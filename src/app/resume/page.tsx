"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { IconFile, IconUpload } from "@/components/icons";
import { AppShell } from "@/components/layout/AppShell";
import { analyzeResume } from "@/lib/api";

export default function ResumeUploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  function accept(next?: File) {
    if (!next) return;
    const ok = /\.(pdf|docx?)$/i.test(next.name);
    if (!ok) {
      setError("Upload a PDF or DOCX file.");
      setFile(null);
      return;
    }
    setError("");
    setFile(next);
  }

  async function analyze() {
    if (!file) {
      setError("Choose a resume first.");
      return;
    }
    setAnalyzing(true);
    await analyzeResume(file.name);
    router.push("/resume/analysis");
  }

  return (
    <AppShell kicker="Documents" title="Resume upload">
      <div className="grid grid-2">
        <section className="card card-pad grid">
          <div
            className={`dropzone ${over ? "over" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setOver(false);
              accept(event.dataTransfer.files[0]);
            }}
          >
            <IconUpload width={32} height={32} />
            <h3 style={{ margin: "12px 0 6px" }}>Drag and drop your resume</h3>
            <p className="muted">PDF or DOCX, up to 10 MB. Parsing and scoring will be wired to the AI API later.</p>
            <button className="btn btn-ghost" type="button" style={{ marginTop: 16 }} onClick={() => inputRef.current?.click()}>
              Upload file
            </button>
            <input
              ref={inputRef}
              className="hidden-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => accept(event.target.files?.[0])}
            />
          </div>
          {file ? (
            <div className="card file-preview">
              <div className="company-row">
                <IconFile />
                <div>
                  <strong>{file.name}</strong>
                  <p className="muted">{Math.max(1, Math.round(file.size / 1024))} KB · ready to analyze</p>
                </div>
              </div>
              <button className="btn btn-ghost" type="button" onClick={() => setFile(null)}>
                Remove
              </button>
            </div>
          ) : null}
          {error ? <p style={{ color: "var(--danger)" }}>{error}</p> : null}
          <button className="btn btn-primary" type="button" onClick={analyze} disabled={analyzing}>
            {analyzing ? "AI is analyzing your resume…" : "Analyze resume"}
          </button>
        </section>
        <aside className="card card-pad">
          <h3 className="section-title">What CareerLens extracts</h3>
          <ul className="list">
            <li>Skills and technologies</li>
            <li>Experience and education</li>
            <li>Projects and certifications</li>
            <li>A resume strength score used across the job feed</li>
          </ul>
          {analyzing ? (
            <div className="loading-panel">
              <div className="spinner" />
              <p>Reading bullets, clustering skills, and scoring impact…</p>
            </div>
          ) : null}
        </aside>
      </div>
    </AppShell>
  );
}
