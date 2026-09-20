"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MessageSquare, RotateCcw, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DeleteJobDialog } from "@/components/shared/delete-job-dialog"
import type { Job } from "@/lib/types"

interface JobActionsProps {
  job: Pick<Job, "id" | "title" | "status">
  /** "compact" renders icon buttons for cards; "full" renders labelled buttons. */
  layout?: "compact" | "full"
}

export function JobActions({ job, layout = "compact" }: JobActionsProps) {
  const router = useRouter()
  const [confirmOpen, setConfirmOpen] = useState(false)

  function handleConfirm() {
    setConfirmOpen(false)
    router.push("/jobs")
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {layout === "compact" ? (
        <>
          {job.status === "completed" ? (
            <Button asChild variant="secondary" size="icon-sm" aria-label="Chat">
              <Link href={`/jobs/${job.id}/chat`}>
                <MessageSquare />
              </Link>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="icon-sm"
              aria-label="Chat"
              disabled
            >
              <MessageSquare />
            </Button>
          )}
          <Button variant="secondary" size="icon-sm" aria-label="Rerun">
            <RotateCcw />
          </Button>
          <Button
            variant="destructive"
            size="icon-sm"
            aria-label="Delete"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 />
          </Button>
        </>
      ) : (
        <>
          <Button variant="secondary">
            Rerun
            <RotateCcw />
          </Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </>
      )}
      <DeleteJobDialog
        jobTitle={job.title}
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
