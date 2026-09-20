import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { JobCard } from "@/components/shared/job-card"
import { JobFilters } from "@/components/shared/job-filters"
import { PageContainer } from "@/components/shared/page-container"
import { filterJobs, getJobs } from "@/lib/jobs"

export default async function JobsPage({
  searchParams,
}: PageProps<"/jobs">) {
  const { q, date } = await searchParams
  const jobs = filterJobs(getJobs(), {
    q: typeof q === "string" ? q : undefined,
    date: typeof date === "string" ? date : undefined,
  })

  return (
    <PageContainer className="flex flex-col gap-5 pt-9 pb-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl sm:text-4xl">Jobs</h1>
        <Button asChild>
          <Link href="/">
            New job
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <Suspense>
        <JobFilters />
      </Suspense>

      {jobs.length === 0 ? (
        <EmptyState title="No jobs match that search." className="border-0" />
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
