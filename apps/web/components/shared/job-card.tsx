import Link from "next/link"
import { Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { JobActions } from "@/components/shared/job-actions"
import { JobStatusBadge } from "@/components/shared/job-status-badge"
import { formatJobDate } from "@/lib/jobs"
import type { Job } from "@/lib/types"

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="gap-2.5">
      <div className="flex items-center justify-between gap-1.5">
        <Badge variant="neutral">{job.platform}</Badge>
        <JobStatusBadge job={job} />
      </div>
      <h2 className="text-lg leading-tight">
        <Link href={`/jobs/${job.id}`} className="hover:text-primary">
          {job.title}
        </Link>
      </h2>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="size-3.5" aria-hidden />
        <span>
          {formatJobDate(job.createdAt)} · {job.duration}
        </span>
      </p>
      <JobActions job={job} />
    </Card>
  )
}
