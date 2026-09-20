"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface JobSummaryTabsProps {
  summary: string
  transcript: string
}

const BULLET_MARKER = /^\s*[-*•]\s+/

/** The API returns markdown: a short overview followed by bullet points. */
function toLines(summary: string) {
  return summary
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      isBullet: BULLET_MARKER.test(line),
      text: line
        .replace(BULLET_MARKER, "")
        .replace(/^#+\s*/, "")
        .replaceAll("**", ""),
    }))
}

export function JobSummaryTabs({ summary, transcript }: JobSummaryTabsProps) {
  const lines = toLines(summary)

  return (
    <Tabs defaultValue="summary">
      <TabsList>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <div className="flex flex-col gap-3">
          {lines.map(({ isBullet, text }, index) =>
            isBullet ? (
              <div key={index} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="flex-none font-semibold text-primary"
                >
                  —
                </span>
                <p>{text}</p>
              </div>
            ) : (
              <p key={index}>{text}</p>
            )
          )}
        </div>
      </TabsContent>
      <TabsContent value="transcript">
        <div className="max-h-96 overflow-auto rounded-md border p-4">
          <p className="text-sm leading-relaxed whitespace-pre-line text-secondary-foreground">
            {transcript}
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
