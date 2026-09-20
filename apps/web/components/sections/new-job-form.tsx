"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Paperclip, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NEW_JOB_COPY, PLATFORMS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function NewJobForm() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!file && !url.trim()) return
    router.push("/jobs")
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault()
    setDragOver(false)
    const dropped = event.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <form
          onSubmit={handleSubmit}
          onDragOver={(event) => {
            event.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="flex gap-2.5"
        >
          <div className="relative flex-1">
            <Label htmlFor="url-input" className="sr-only">
              {NEW_JOB_COPY.urlLabel}
            </Label>
            <Input
              id="url-input"
              placeholder={NEW_JOB_COPY.urlPlaceholder}
              value={file ? file.name : url}
              onChange={(event) => setUrl(event.target.value)}
              disabled={!!file}
              className="h-11 pr-11"
            />
            {file ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Remove file"
                onClick={() => setFile(null)}
                className="absolute top-1/2 right-1.5 -translate-y-1/2"
              >
                <X />
              </Button>
            ) : (
              <Label
                htmlFor="file-input"
                aria-label="Attach a video or audio file"
                className="absolute top-1/2 right-2.5 size-6 -translate-y-1/2 cursor-pointer justify-center text-muted-foreground has-[+input:focus-visible]:outline-2 hover:text-primary"
              >
                <Paperclip className="size-4" />
              </Label>
            )}
            <input
              id="file-input"
              type="file"
              accept="video/*,audio/*"
              className="sr-only"
              onChange={(event) => {
                const picked = event.target.files?.[0]
                if (picked) setFile(picked)
                event.target.value = ""
              }}
            />
          </div>
          <Button type="submit" className="h-11 flex-none px-5">
            {NEW_JOB_COPY.submit}
            <ArrowRight />
          </Button>
        </form>
        <div
          aria-hidden={!dragOver}
          className={cn(
            "pointer-events-none absolute -inset-1 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-accent backdrop-blur-sm transition-opacity",
            dragOver ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="font-heading font-semibold text-accent-text">
            {NEW_JOB_COPY.dropHint}
          </span>
        </div>
      </div>

      <ul className="flex flex-wrap justify-center gap-2">
        {PLATFORMS.map((platform) => (
          <li
            key={platform}
            className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
          >
            {platform}
          </li>
        ))}
      </ul>
    </div>
  )
}
