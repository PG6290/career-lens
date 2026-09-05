"use client";

import { IconFilter, IconSearch } from "@/components/icons";
import { filterOptions } from "@/data/mock";
import type { JobFilters as Filters } from "@/lib/types";

export function JobFilters({
  value,
  onChange,
}: {
  value: Filters;
  onChange: (next: Filters) => void;
}) {
  const set = (key: keyof Filters, next: string) => {
    onChange({ ...value, [key]: next || undefined });
  };

  return (
    <section className="card filters">
      <div className="search-wrap">
        <IconSearch />
        <input
          className="input"
          placeholder="Search title, company, recruiter, or location"
          value={value.query ?? ""}
          onChange={(e) => set("query", e.target.value)}
        />
      </div>
      <div className="muted" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <IconFilter width={16} height={16} /> Filters
      </div>
      <div className="filters-grid">
        <label className="field">
          <span>Recruiter / Company</span>
          <select className="select" value={value.company ?? ""} onChange={(e) => set("company", e.target.value)}>
            <option value="">All companies</option>
            {filterOptions.companies.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Job source</span>
          <select className="select" value={value.source ?? ""} onChange={(e) => set("source", e.target.value)}>
            <option value="">All sources</option>
            {filterOptions.sources.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Location</span>
          <select className="select" value={value.location ?? ""} onChange={(e) => set("location", e.target.value)}>
            <option value="">All locations</option>
            {filterOptions.locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Job type</span>
          <select className="select" value={value.type ?? ""} onChange={(e) => set("type", e.target.value)}>
            <option value="">All types</option>
            {filterOptions.types.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Experience</span>
          <select
            className="select"
            value={value.experience ?? ""}
            onChange={(e) => set("experience", e.target.value)}
          >
            <option value="">All levels</option>
            {filterOptions.experience.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Skills</span>
          <select className="select" value={value.skill ?? ""} onChange={(e) => set("skill", e.target.value)}>
            <option value="">All skills</option>
            {filterOptions.skills.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Minimum match %</span>
          <select
            className="select"
            value={String(value.minMatch ?? "")}
            onChange={(e) =>
              onChange({ ...value, minMatch: e.target.value ? Number(e.target.value) : undefined })
            }
          >
            <option value="">Any score</option>
            <option value="50">50%+</option>
            <option value="70">70%+</option>
            <option value="80">80%+</option>
            <option value="90">90%+</option>
          </select>
        </label>
      </div>
    </section>
  );
}
