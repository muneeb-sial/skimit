export type JobStatus =
  | "queued"
  | "uploading"
  | "processing"
  | "completed"
  | "failed"

export type JobSource = "url" | "file"

export interface Job {
  id: string
  title: string
  platform: string
  source: JobSource
  status: JobStatus
  progress: number
  createdAt: string
  duration: string
  summaryBullets: string[]
  transcript: string
  pendingMessage: string
  pendingDetail: string
}

export type ChatRole = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}
