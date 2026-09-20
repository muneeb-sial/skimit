"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NavLinks } from "@/components/shared/nav-links"

interface MobileNavProps {
  links: readonly { href: string; label: string }[]
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-b bg-background px-4 py-3"
        >
          <NavLinks
            links={links}
            onNavigate={() => setOpen(false)}
            className="rounded-md px-3 py-2 aria-[current=page]:bg-accent"
          />
        </nav>
      )}
    </div>
  )
}
