"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    if (!email.includes("@") || password.length < 6) {
      setError("Use a valid email and a password with at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <div className="auth-visual">
          <div className="brand">
            <div className="brand-mark">CL</div>
            <div className="brand-copy">
              <strong>CareerLens</strong>
              <span>AI Job Scraper & Resume Matcher</span>
            </div>
          </div>
          <h1>See the job. See the fit.</h1>
          <p className="muted">
            A dark, recruiter-grade workspace for scraping roles, scoring your resume, and closing skill gaps
            before you apply.
          </p>
        </div>
        <div className="auth-form">
          <div className="tabs">
            <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
              Login
            </button>
            <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>
              Sign up
            </button>
          </div>
          <h2 style={{ marginBottom: 8 }}>{mode === "login" ? "Welcome back" : "Create your workspace"}</h2>
          <p className="muted" style={{ marginBottom: 20 }}>
            Frontend-only auth for now. Any valid email and password will continue.
          </p>
          <form className="grid" onSubmit={onSubmit}>
            {mode === "signup" ? (
              <label className="field">
                <span>Full name</span>
                <input className="input" name="name" placeholder="Aarav Mehta" />
              </label>
            ) : null}
            <label className="field">
              <span>Email</span>
              <input className="input" name="email" type="email" placeholder="you@email.com" />
            </label>
            <label className="field">
              <span>Password</span>
              <input className="input" name="password" type="password" placeholder="••••••••" />
            </label>
            {error ? <p style={{ color: "var(--danger)" }}>{error}</p> : null}
            <button className="btn btn-primary" disabled={loading} type="submit">
              {loading ? "Signing you in…" : mode === "login" ? "Continue" : "Create account"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => router.push("/dashboard")}>
              Continue as guest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
