import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Mail } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { JobActions } from "@/components/shared/job-actions"
import { JobStatusBadge } from "@/components/shared/job-status-badge"
import { JobSummaryTabs } from "@/components/shared/job-summary-tabs"
import { PageContainer } from "@/components/shared/page-container"
import { formatJobDate, getJob } from "@/lib/jobs"

export default async function JobDetailPage({
  params,
}: PageProps<"/jobs/[id]">) {
  const { id } = await params
  const job = getJob(id)
  if (!job) notFound()

  return (
    <PageContainer className="max-w-2xl pt-8 pb-14">
      <Button asChild variant="ghost" className="mb-3 -ml-1 text-muted-foreground">
        <Link href="/jobs">
          <ChevronLeft />
          All jobs
        </Link>
      </Button>

      <div className="mb-2.5 flex gap-1.5">
        <Badge variant="neutral">{job.platform}</Badge>
        <JobStatusBadge job={job} />
      </div>
      <h1 className="mb-1.5 text-3xl sm:text-4xl">{job.title}</h1>
      <p className="text-sm text-muted-foreground">
        Created {formatJobDate(job.createdAt)} · {job.duration}
      </p>

      <div className="my-4">
        <JobActions job={job} layout="full" />
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Mail className="size-3.5" aria-hidden />
        You&rsquo;ll get an email when this job finishes processing.
      </p>

      <hr className="my-5" />

      {job.status === "completed" ? (
        <JobSummaryTabs bullets={job.summaryBullets} transcript={job.transcript} />
      ) : (
        <EmptyState title={job.pendingMessage} description={job.pendingDetail} />
      )}
    </PageContainer>
  )
}
