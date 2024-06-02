"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavStudentDashboard, NavTeacherDashboard } from "@/config/dashboard"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SideNavItemsProps = {
  role: string
}

export default function SideNavItems({ role }: Readonly<SideNavItemsProps>) {
  const pathname = usePathname()

  const items = role === "student" ? NavStudentDashboard : NavTeacherDashboard

  return (
    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <Link
        href="#"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <p className="text-sm">Go</p>
        <span className="sr-only">Acme Inc</span>
      </Link>
      {items.map((item) => (
        <TooltipProvider key={item.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  item.href === pathname
                    ? "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  )
}
