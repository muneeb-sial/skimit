"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface JobSummaryTabsProps {
  bullets: string[]
  transcript: string
}

export function JobSummaryTabs({ bullets, transcript }: JobSummaryTabsProps) {
  return (
    <Tabs defaultValue="summary">
      <TabsList>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <ul className="flex flex-col gap-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5">
              <span aria-hidden className="flex-none font-semibold text-primary">
                —
              </span>
              <p>{bullet}</p>
            </li>
          ))}
        </ul>
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
