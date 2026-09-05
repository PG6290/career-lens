"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { currentUser, resumeProfile } from "@/data/mock";
import { formatDate, initials } from "@/lib/format";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <AppShell kicker="Account" title="Profile">
      <div className="grid grid-2">
        <section className="card card-pad grid">
          <div className="company-row">
            <div className="avatar lg">{initials(currentUser.name)}</div>
            <div>
              <h2>{currentUser.name}</h2>
              <p className="muted">{currentUser.headline}</p>
            </div>
          </div>
          <label className="field">
            <span>Full name</span>
            <input className="input" defaultValue={currentUser.name} />
          </label>
          <label className="field">
            <span>Headline</span>
            <input className="input" defaultValue={currentUser.title} />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" defaultValue={currentUser.email} />
          </label>
          <label className="field">
            <span>Phone</span>
            <input className="input" defaultValue={currentUser.phone} />
          </label>
          <label className="field">
            <span>Location</span>
            <input className="input" defaultValue={currentUser.location} />
          </label>
          <label className="field">
            <span>Website</span>
            <input className="input" defaultValue={currentUser.website} />
          </label>
          <label className="field">
            <span>About</span>
            <textarea className="input" style={{ minHeight: 120, padding: 12 }} defaultValue={currentUser.about} />
          </label>
          <button className="btn btn-primary" type="button">
            Save profile
          </button>
        </section>
        <aside className="grid">
          <section className="card card-pad">
            <h3 className="section-title">Resume on file</h3>
            <p>
              {resumeProfile.fileName}
              <span className="muted"> · {formatDate(resumeProfile.uploadedAt)}</span>
            </p>
            <p className="muted">Strength {resumeProfile.strengthScore}/100</p>
            <div className="actions" style={{ marginTop: 12 }}>
              <Link className="btn btn-primary" href="/resume">
                Replace file
              </Link>
              <Link className="btn btn-ghost" href="/resume/analysis">
                View analysis
              </Link>
            </div>
          </section>
          <section className="card card-pad">
            <h3 className="section-title">Preferred roles</h3>
            <div className="pills">
              {currentUser.preferredRoles.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <h3 className="section-title" style={{ marginTop: 18 }}>
              Preferred locations
            </h3>
            <div className="pills">
              {currentUser.preferredLocations.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
          <section className="card card-pad">
            <h3 className="section-title">Session</h3>
            <p className="muted">Auth is mocked in the UI. Connect this screen to your user API later.</p>
            <button className="btn btn-ghost" type="button" onClick={() => router.push("/login")}>
              Sign out
            </button>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
