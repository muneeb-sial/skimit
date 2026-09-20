"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { JOB_POLL_INTERVAL_MS } from "@/lib/constants"

/** Re-fetches the server-rendered page on an interval while any job is in flight. */
export function JobAutoRefresh({ active }: { active: boolean }) {
  const router = useRouter()

  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => router.refresh(), JOB_POLL_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [active, router])

  return null
}
