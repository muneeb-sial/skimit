"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface NavLinksProps {
  links: readonly { href: string; label: string }[]
  onNavigate?: () => void
  className?: string
}

export function NavLinks({ links, onNavigate, className }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <>
      {links.map(({ href, label }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "text-sm transition-colors hover:text-primary aria-[current=page]:text-primary",
              className
            )}
          >
            {label}
          </Link>
        )
      })}
    </>
  )
}
