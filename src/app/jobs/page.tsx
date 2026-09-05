"use client";

import { useState } from "react";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { AppShell, EmptyState, ErrorState, Spinner } from "@/components/layout/AppShell";
import { useClientFetch } from "@/hooks/useClientFetch";
import { getJobs } from "@/lib/api";
import type { JobFilters as Filters } from "@/lib/types";

export default function JobsPage() {
  const [filters, setFilters] = useState<Filters>({});
  const key = JSON.stringify(filters);
  const { data: jobs, error, reload } = useClientFetch(() => getJobs(filters), key);

  return (
    <AppShell kicker="Marketplace" title="Job search / feed">
      <div className="grid">
        <JobFilters
          value={filters}
          onChange={(next) => {
            setFilters(next);
          }}
        />
        {!jobs && !error ? <Spinner label="Fetching scraped roles…" /> : null}
        {error ? <ErrorState onRetry={reload} /> : null}
        {jobs && jobs.length === 0 ? (
          <EmptyState
            title="No roles match those filters"
            body="Try lowering the minimum match score or clearing a company filter."
            action={
              <button className="btn btn-primary" type="button" onClick={() => setFilters({})}>
                Reset filters
              </button>
            }
          />
        ) : null}
        {jobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </AppShell>
  );
}
