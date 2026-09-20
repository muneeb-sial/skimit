"use client"

import { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CHAT_REPLY } from "@/lib/constants"
import type { ChatMessage } from "@/lib/types"
import { cn } from "@/lib/utils"

const REPLY_DELAY_MS = 900

export function ChatPanel({ jobTitle }: { jobTitle: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "greeting",
      role: "assistant",
      text: `I've read the summary for "${jobTitle}". Ask me anything about it.`,
    },
  ])
  const [draft, setDraft] = useState("")
  const endRef = useRef<HTMLDivElement>(null)
  const replyTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" })
  }, [messages])

  useEffect(() => () => clearTimeout(replyTimer.current), [])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return

    setMessages((current) => [
      ...current,
      { id: `user-${current.length}`, role: "user", text },
    ])
    setDraft("")
    replyTimer.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `assistant-${current.length}`, role: "assistant", text: CHAT_REPLY },
      ])
    }, REPLY_DELAY_MS)
  }

  return (
    <>
      <div
        role="log"
        aria-live="polite"
        className="flex flex-1 flex-col gap-2.5 overflow-y-auto pb-3"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-normal",
              message.role === "user"
                ? "self-end rounded-br-sm border border-primary text-accent-text"
                : "self-start rounded-bl-sm bg-secondary text-foreground"
            )}
          >
            {message.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-3.5">
        <Label htmlFor="chat-input" className="sr-only">
          Ask about the summary
        </Label>
        <Input
          id="chat-input"
          placeholder="Ask about the summary…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon" aria-label="Send">
          <Send />
        </Button>
      </form>
    </>
  )
}
