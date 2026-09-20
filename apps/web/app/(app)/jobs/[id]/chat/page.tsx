import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ChatPanel } from "@/components/shared/chat-panel"
import { PageContainer } from "@/components/shared/page-container"
import { getJob } from "@/lib/jobs"

export default async function JobChatPage({
  params,
}: PageProps<"/jobs/[id]/chat">) {
  const { id } = await params
  const job = getJob(id)
  if (!job || job.status !== "completed") notFound()

  return (
    // Fills the viewport below the sticky header so the input stays pinned.
    <PageContainer className="flex h-[calc(100dvh-var(--header-height))] max-w-2xl flex-col py-4">
      <div className="mb-3.5 flex items-center gap-2.5 border-b pb-3.5">
        <Button
          asChild
          variant="secondary"
          size="icon-sm"
          aria-label="Back to job"
        >
          <Link href={`/jobs/${job.id}`}>
            <ChevronLeft />
          </Link>
        </Button>
        <div className="min-w-0">
          <h1 className="truncate text-base">{job.title}</h1>
          <p className="text-xs text-muted-foreground">
            Chat about this summary
          </p>
        </div>
      </div>
      <ChatPanel jobTitle={job.title} />
    </PageContainer>
  )
}
