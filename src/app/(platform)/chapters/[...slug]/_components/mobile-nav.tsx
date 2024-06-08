"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ChaptersNavItem, ChapterSubNavItem } from "@/types/chapters"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

type ChapterMobileNavProps = {
  NavItems: ChaptersNavItem[]
  progress: number
}

export default function ChapterMobileNav({ NavItems, progress }: Readonly<ChapterMobileNavProps>) {
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false)
  const pathname = usePathname()

  return (
    <>
      {!showMobileNav ? (
        <Button
          type="button"
          variant={"ghost"}
          className={cn("mx-2 md:hidden")}
          aria-label="Open Toggle"
          onClick={() => setShowMobileNav(true)}
        >
          <Icons.List />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      ) : (
        <Button
          type="button"
          variant={"ghost"}
          className={cn("mx-2 md:hidden")}
          aria-label="Close Toggle"
          onClick={() => setShowMobileNav(false)}
        >
          <Icons.Close />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      )}
      {showMobileNav && NavItems.length ? (
        <div className="fixed inset-0 top-14 z-20 grid h-screen grid-flow-row auto-rows-max overflow-auto bg-accent p-6 pb-20 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative grid gap-4 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <h3 className="px-2 text-lg font-bold">Silabus</h3>
            {NavItems.map((item) => (
              <div className="pb-3" key={item.title}>
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-bold">{item.title}</h4>
                {item.items ? <MobileNavItem Items={item.items} pathname={pathname} progress={progress} /> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

type MobileNavItemProps = {
  Items: ChapterSubNavItem[]
  pathname: string
  progress: number
}

function MobileNavItem({ Items, pathname, progress }: Readonly<MobileNavItemProps>) {
  return Items.length ? (
    <ul className="grid grid-flow-row auto-rows-max text-sm">
      {Items.map((item) =>
        progress >= item.threshold ? (
          <li key={item.title}>
            <Link
              href={item.href}
              className={cn("flex w-full items-center rounded-md p-2 hover:underline", {
                "bg-muted": pathname === item.href,
              })}
            >
              {item.title}
            </Link>
          </li>
        ) : (
          <span key={item.title} className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">
            {item.title}
          </span>
        )
      )}
    </ul>
  ) : null
}
