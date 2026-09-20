import { PLATFORM_HOSTS, UPLOADED_PLATFORM } from "@/lib/constants"
import type { Job, JobStatus } from "@/lib/types"
import { API_BASE_URL, ApiError, errorMessage, request } from "@/services/http"

type SkimStatus =
  | "pending"
  | "downloading"
  | "transcribing"
  | "summarizing"
  | "done"
  | "failed"

interface SkimRead {
  id: number
  status: SkimStatus
  error: string | null
  source_url: string | null
  title: string | null
  transcript: string | null
  segments: { end: number }[] | null
  summary: string | null
  duration_s: number | null
  created_at: string
}

const JOB_STATUS: Record<SkimStatus, JobStatus> = {
  pending: "queued",
  downloading: "processing",
  transcribing: "processing",
  summarizing: "processing",
  done: "completed",
  failed: "failed",
}

const PENDING_COPY: Record<SkimStatus, { message: string; detail: string }> = {
  pending: {
    message: "Queued",
    detail: "This job is next in line. We'll start transcribing shortly.",
  },
  downloading: {
    message: "Downloading audio",
    detail: "We're fetching the audio from the link.",
  },
  transcribing: {
    message: "Transcribing",
    detail: "We're generating the transcript now.",
  },
  summarizing: {
    message: "Summarizing",
    detail: "We're writing the summary now.",
  },
  done: { message: "", detail: "" },
  failed: {
    message: "Transcription failed",
    detail: "Something went wrong while processing. Try rerunning the job.",
  },
}

function platformOf(sourceUrl: string | null): string {
  if (!sourceUrl) return UPLOADED_PLATFORM
  const host = new URL(sourceUrl).hostname.replace(/^www\./, "")
  const known = PLATFORM_HOSTS.find(({ domain }) => host.endsWith(domain))
  return known?.label ?? host
}

function formatDuration(totalSeconds: number | null): string {
  if (totalSeconds === null) return "—"
  const seconds = Math.round(totalSeconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = String(seconds % 60).padStart(2, "0")
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${rest}`
    : `${minutes}:${rest}`
}

function toIsoDate(createdAt: string): string {
  // The API serializes UTC datetimes without a zone suffix.
  const hasZone = /(Z|[+-]\d{2}:\d{2})$/.test(createdAt)
  return new Date(hasZone ? createdAt : `${createdAt}Z`)
    .toISOString()
    .slice(0, 10)
}

function toJob(skim: SkimRead): Job {
  const lastSegment = skim.segments?.at(-1)
  const copy = PENDING_COPY[skim.status]

  return {
    id: String(skim.id),
    title: skim.title ?? skim.source_url ?? "Untitled",
    platform: platformOf(skim.source_url),
    source: skim.source_url ? "url" : "file",
    status: JOB_STATUS[skim.status],
    createdAt: toIsoDate(skim.created_at),
    duration: formatDuration(skim.duration_s ?? lastSegment?.end ?? null),
    summary: skim.summary ?? "",
    transcript: skim.transcript ?? "",
    pendingMessage: copy.message,
    pendingDetail:
      skim.status === "failed" && skim.error ? skim.error : copy.detail,
  }
}

export async function listSkims(): Promise<Job[]> {
  return (await request<SkimRead[]>("/skim")).map(toJob)
}

export async function getSkim(id: string): Promise<Job | null> {
  try {
    return toJob(await request<SkimRead>(`/skim/${id}`))
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
}

export async function submitUrl(url: string): Promise<Job> {
  const body = new FormData()
  body.append("url", url)
  return toJob(await request<SkimRead>("/skim", { method: "POST", body }))
}

/** Uses XHR rather than fetch so the upload can report progress (0-100). */
export function submitFile(
  file: File,
  onProgress?: (percent: number) => void
): Promise<Job> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", `${API_BASE_URL}/skim`)
    xhr.responseType = "json"

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.round((event.loaded / event.total) * 100))
      }
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(toJob(xhr.response as SkimRead))
      } else {
        reject(new ApiError(xhr.status, errorMessage(xhr.response)))
      }
    }
    xhr.onerror = () => reject(new ApiError(0, errorMessage(null)))

    const body = new FormData()
    body.append("file", file)
    xhr.send(body)
  })
}

export async function rerunSkim(id: string): Promise<Job> {
  return toJob(await request<SkimRead>(`/skim/${id}/rerun`, { method: "POST" }))
}

export async function deleteSkim(id: string): Promise<void> {
  await request<void>(`/skim/${id}`, { method: "DELETE" })
}
