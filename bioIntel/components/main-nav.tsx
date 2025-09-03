"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/data-explorer", label: "Data Explorer" },
  { href: "/analytics", label: "Analytics" },
  { href: "/predictions", label: "Predictions" },
  { href: "/alerts", label: "Alerts" },
]

export function MainNav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight text-blue-600">
          GenomicWatch
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-2">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded px-3 py-2 text-sm transition-colors",
                  active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
