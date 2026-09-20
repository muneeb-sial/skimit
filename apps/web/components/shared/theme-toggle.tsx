"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark")
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light")
    } catch {
      // Storage unavailable: the theme still applies for this session.
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={toggle}
      className={className}
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  )
}
