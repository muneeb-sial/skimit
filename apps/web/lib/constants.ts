import type { VariantProps } from "class-variance-authority"

import type { badgeVariants } from "@/components/ui/badge"
import type { JobStatus } from "@/lib/types"

export const APP_NAME = "Skimit"

export const NAV_LINKS = [
  { href: "/", label: "New job" },
  { href: "/jobs", label: "Jobs" },
] as const

export const PLATFORMS = ["YouTube", "Instagram", "TikTok", "WhatsApp"] as const

export const NEW_JOB_COPY = {
  kicker: "New job",
  title: "Give it a link, a video, or an audio file",
  description:
    "Paste a link from YouTube, Instagram, TikTok or WhatsApp, or drop a video or audio file. We transcribe it and write the summary in the background.",
  urlLabel: "Video or audio link",
  urlPlaceholder: "Paste a YouTube, Instagram, TikTok or WhatsApp link…",
  submit: "Transcribe",
  dropHint: "Drop your video or audio file",
} as const

export const JOB_STATUS_META: Record<
  JobStatus,
  { label: string; variant: NonNullable<VariantProps<typeof badgeVariants>["variant"]> }
> = {
  completed: { label: "Completed", variant: "default" },
  processing: { label: "Processing", variant: "neutral" },
  queued: { label: "Queued", variant: "muted" },
  failed: { label: "Failed", variant: "destructive" },
}

export const JOB_POLL_INTERVAL_MS = 3000

export const UPLOADED_PLATFORM = "Uploaded file"

export const PLATFORM_HOSTS = [
  { domain: "youtube.com", label: "YouTube" },
  { domain: "youtu.be", label: "YouTube" },
  { domain: "instagram.com", label: "Instagram" },
  { domain: "tiktok.com", label: "TikTok" },
  { domain: "facebook.com", label: "Facebook" },
  { domain: "linkedin.com", label: "LinkedIn" },
  { domain: "whatsapp.com", label: "WhatsApp" },
] as const

export const CHAT_COPY = {
  greeting: (jobTitle: string) =>
    `I've read the summary for "${jobTitle}". Ask me anything about it.`,
} as const
