"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const labelClassName = "text-xs font-normal text-muted-foreground"

export function JobFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const q = params.get("q") ?? ""
  const date = params.get("date") ?? ""

  function update(key: "q" | "date", value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    const query = next.toString()
    router.replace(query ? `/jobs?${query}` : "/jobs")
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-48 flex-2 space-y-1.5">
        <Label htmlFor="search-title" className={labelClassName}>
          Search by title
        </Label>
        <Input
          id="search-title"
          placeholder="Search jobs…"
          defaultValue={q}
          onChange={(event) => update("q", event.target.value)}
        />
      </div>
      <div className="min-w-40 flex-1 space-y-1.5">
        <Label htmlFor="search-date" className={labelClassName}>
          Created on
        </Label>
        <Input
          id="search-date"
          type="date"
          defaultValue={date}
          onChange={(event) => update("date", event.target.value)}
        />
      </div>
      {(q || date) && (
        <Button variant="ghost" onClick={() => router.replace("/jobs")}>
          Clear
        </Button>
      )}
    </div>
  )
}
