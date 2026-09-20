import type { VariantProps } from "class-variance-authority"

import type { badgeVariants } from "@/components/ui/badge"
import type { Job, JobStatus } from "@/lib/types"

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
  uploading: { label: "Uploading", variant: "muted" },
  failed: { label: "Failed", variant: "destructive" },
}

export const CHAT_REPLY =
  "Based on the summary, the video covers that topic directly — check the Summary tab for the key points, or ask me something more specific."

export const SEED_JOBS: Job[] = [
  {
    id: "j6",
    title: "Morning Routine That Changed Everything",
    platform: "WhatsApp",
    source: "url",
    status: "queued",
    progress: 0,
    createdAt: "2026-09-17",
    duration: "9:50",
    summaryBullets: [],
    transcript: "",
    pendingMessage: "Queued",
    pendingDetail: "This job is next in line. We'll start transcribing shortly.",
  },
  {
    id: "j3",
    title: "Q3 Earnings Call Recap",
    platform: "Uploaded audio",
    source: "file",
    status: "uploading",
    progress: 54,
    createdAt: "2026-09-17",
    duration: "—",
    summaryBullets: [],
    transcript: "",
    pendingMessage: "Uploading — 54%",
    pendingDetail: "Hang tight while the file finishes uploading.",
  },
  {
    id: "j2",
    title: "Kitchen Reno Day 12 Walkthrough",
    platform: "Instagram",
    source: "url",
    status: "processing",
    progress: 0,
    createdAt: "2026-09-16",
    duration: "4:05",
    summaryBullets: [],
    transcript: "",
    pendingMessage: "Transcribing and summarizing",
    pendingDetail: "We're generating the transcript and summary now.",
  },
  {
    id: "j1",
    title: "How Neural Networks Actually Learn",
    platform: "YouTube",
    source: "url",
    status: "completed",
    progress: 100,
    createdAt: "2026-09-15",
    duration: "18:42",
    summaryBullets: [
      "Backpropagation adjusts weights by tracing the error backward through each layer — repeated calculus, not magic.",
      "The learning rate is the biggest lever: too high and training overshoots, too low and it stalls.",
      "Overfitting shows up when validation loss rises while training loss keeps falling.",
      'The video argues most claims about "AI understanding" overstate what gradient descent is actually doing.',
    ],
    transcript:
      "So a neural network is really just a big function with a bunch of tunable knobs, and training is the process of nudging those knobs so the function's output gets closer to what you want.\n\nEvery layer takes the error from the layer after it and asks: which of my knobs made this worse, and by how much? That's backpropagation. It's mechanical, not intelligent.\n\nThe learning rate controls how big each nudge is. Too big and you bounce around the right answer forever. Too small and you barely move.",
    pendingMessage: "",
    pendingDetail: "",
  },
  {
    id: "j5",
    title: "Client Interview Recording",
    platform: "Uploaded video",
    source: "file",
    status: "failed",
    progress: 0,
    createdAt: "2026-09-11",
    duration: "32:10",
    summaryBullets: [],
    transcript: "",
    pendingMessage: "Transcription failed",
    pendingDetail:
      "The audio track couldn't be extracted — the file may be corrupted. Try rerunning the job.",
  },
  {
    id: "j4",
    title: "Late Night Jazz Set Clip",
    platform: "TikTok",
    source: "url",
    status: "completed",
    progress: 100,
    createdAt: "2026-09-12",
    duration: "2:18",
    summaryBullets: [
      "A four-piece combo runs through six standards recorded live at a small club.",
      "The clip highlights an extended bass solo around the 1:40 mark.",
      "Audio quality is clean enough that the transcript captures the song titles announced between sets.",
      "No vocals — the transcript is mostly the emcee's announcements.",
    ],
    transcript:
      "Alright, thank you, thank you. We're gonna slow it down for this next one, an old standard, see if you all recognize it.\n\n[extended instrumental — bass solo]\n\nThat's it for us tonight, we'll be back next Thursday, same time.",
    pendingMessage: "",
    pendingDetail: "",
  },
]
