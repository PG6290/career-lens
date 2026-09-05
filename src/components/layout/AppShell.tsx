"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  IconBell,
  IconBriefcase,
  IconGap,
  IconHome,
  IconLogout,
  IconScan,
  IconUpload,
  IconUser,
} from "@/components/icons";
import { currentUser } from "@/data/mock";
import { initials } from "@/lib/format";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: IconHome },
  { href: "/jobs", label: "Job Feed", icon: IconBriefcase },
  { href: "/resume", label: "Resume", icon: IconUpload },
  { href: "/resume/analysis", label: "Analysis", icon: IconScan },
  { href: "/skill-gap", label: "Skill Gaps", icon: IconGap },
  { href: "/profile", label: "Profile", icon: IconUser },
];

const mobileNav = [
  nav[0],
  nav[1],
  nav[2],
  nav[4],
  nav[5],
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  if (href === "/resume") return pathname === "/resume";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({
  title,
  kicker,
  children,
  action,
}: {
  title: string;
  kicker?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="app-shell has-nav">
      <aside className="sidebar">
        <Link href="/dashboard" className="brand">
          <div className="brand-mark">CL</div>
          <div className="brand-copy">
            <strong>CareerLens</strong>
            <span>AI Job Matcher</span>
          </div>
        </Link>
        <nav className="nav-list">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(pathname, item.href) ? "active" : ""}`}
            >
              <item.icon />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar">{initials(currentUser.name)}</div>
            <div>
              <strong>{currentUser.name}</strong>
              <small>{currentUser.title}</small>
            </div>
          </div>
          <button className="btn btn-ghost" type="button" onClick={() => router.push("/login")}>
            <IconLogout /> Sign out
          </button>
        </div>
      </aside>
      <div className="main-wrap">
        <header className="topbar">
          <div>
            {kicker ? <p className="page-kicker">{kicker}</p> : null}
            <h1 className="page-title">{title}</h1>
          </div>
          <div className="actions">
            {action}
            <button className="icon-btn" type="button" aria-label="Notifications">
              <IconBell />
            </button>
          </div>
        </header>
        {children}
      </div>
      <nav className="bottom-nav">
        {mobileNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(pathname, item.href) ? "active" : ""}
          >
            <item.icon width={18} height={18} />
            {item.label === "Dashboard" ? "Home" : item.label.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function Spinner({ label = "Loading CareerLens…" }: { label?: string }) {
  return (
    <div className="card loading-panel">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="card empty">
      <h3>{title}</h3>
      <p className="muted" style={{ margin: "8px 0 16px" }}>
        {body}
      </p>
      {action}
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong while loading this view.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="card error">
      <h3>Couldn’t load this page</h3>
      <p className="muted" style={{ margin: "8px 0 16px" }}>
        {message}
      </p>
      {onRetry ? (
        <button className="btn btn-primary" type="button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function MatchBadge({ score }: { score: number }) {
  const tone = score >= 80 ? "high" : score >= 60 ? "mid" : "low";
  return (
    <div className={`match-badge ${tone}`}>
      <small>Resume Match</small>
      {score}%
    </div>
  );
}

export function SkillPills({
  skills,
}: {
  skills: { name: string; matched: boolean }[];
}) {
  return (
    <div className="pills">
      {skills.map((skill) => (
        <span key={skill.name} className={`pill ${skill.matched ? "ok" : "miss"}`}>
          {skill.matched ? "✓" : "✗"} {skill.name}
        </span>
      ))}
    </div>
  );
}

export function MatchRing({ score, label }: { score: number; label?: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 80 ? "#3dd68c" : score >= 60 ? "#f5c14a" : "#ff6b7a";
  return (
    <div className="ring-wrap">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="ring-label">
        <b>{score}%</b>
        <small className="muted">{label ?? "Match"}</small>
      </div>
    </div>
  );
}
