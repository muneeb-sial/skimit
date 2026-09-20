import { SEED_JOBS } from "@/lib/constants"
import type { Job } from "@/lib/types"

export interface JobFilters {
  q?: string
  date?: string
}

export function getJobs(): Job[] {
  return SEED_JOBS
}

export function getJob(id: string): Job | undefined {
  return SEED_JOBS.find((job) => job.id === id)
}

export function filterJobs(jobs: Job[], { q, date }: JobFilters): Job[] {
  const query = q?.trim().toLowerCase()
  return jobs.filter(
    (job) =>
      (!query || job.title.toLowerCase().includes(query)) &&
      (!date || job.createdAt === date)
  )
}

export function formatJobDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate))
}
