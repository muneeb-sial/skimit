import { Badge } from "@/components/ui/badge"
import { JOB_STATUS_META } from "@/lib/constants"
import type { Job } from "@/lib/types"

export function JobStatusBadge({
  job,
  className,
}: {
  job: Pick<Job, "status" | "progress">
  className?: string
}) {
  const { label, variant } = JOB_STATUS_META[job.status]

  return (
    <Badge variant={variant} className={className}>
      {job.status === "uploading" ? `${label} ${job.progress}%` : label}
    </Badge>
  )
}
