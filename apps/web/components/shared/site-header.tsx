import Link from "next/link"

import { MobileNav } from "@/components/shared/mobile-nav"
import { NavLinks } from "@/components/shared/nav-links"
import { PageContainer } from "@/components/shared/page-container"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { APP_NAME, NAV_LINKS } from "@/lib/constants"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 h-(--header-height) border-b bg-background">
      <PageContainer className="relative flex h-full items-center gap-4">
        <Link
          href="/"
          className="mr-auto font-heading text-xl font-semibold tracking-tight"
        >
          {APP_NAME}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-4 sm:flex">
          <NavLinks links={NAV_LINKS} />
        </nav>
        <ThemeToggle />
        <MobileNav links={NAV_LINKS} />
      </PageContainer>
    </header>
  )
}
