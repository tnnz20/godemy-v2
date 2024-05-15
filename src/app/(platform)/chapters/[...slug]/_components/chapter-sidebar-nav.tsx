"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ChaptersConfig, ChapterSubNavItem } from "@/types/chapters"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

type ChapterSidebarNavProps = {
  chapters: ChaptersConfig
  progress: number
}

export default function ChapterSidebarNav({ chapters, progress }: Readonly<ChapterSidebarNavProps>) {
  const items = chapters.NavItems
  const pathname = usePathname()
  const [showSideNav, setShowSideNav] = useState<boolean>(true)

  const currentOpenPage = items.find((section) => section.items?.some((item) => item.href === pathname))
  const currentIndexPage = items.findIndex((section) => section?.title === currentOpenPage?.title)

  return (
    <>
      {!showSideNav ? (
        <Button
          aria-label="Sidebar Nav Open Toggle"
          onClick={() => setShowSideNav(true)}
          className="border-r-lg fixed -right-3 top-20 z-50 hidden md:inline-block"
        >
          <Icons.List className={cn("rotate-180")} />
        </Button>
      ) : null}

      {items.length ? (
        <div
          className={cn("fixed -right-1/2 hidden overflow-y-auto border-l px-4 py-6 md:block", {
            "sticky left-0 duration-300 animate-in slide-in-from-right-1/2": showSideNav,
          })}
        >
          <div className="mr-2 flex items-center justify-between">
            <Button
              aria-label="Sidebar Nav Close Toggle"
              variant="ghost"
              size="icon"
              className={cn("px-1 transition")}
              onClick={() => setShowSideNav(false)}
            >
              <Icons.Close />
            </Button>
            <h3 className="text-xl font-medium text-foreground">Daftar Silabus</h3>
          </div>
          <nav>
            <Accordion type="single" defaultValue={`item-${currentIndexPage}`} collapsible>
              {items.map((item, index) => (
                <div key={item.title}>
                  <AccordionItem value={"item-" + index} className="m-2">
                    <AccordionTrigger className={cn("flex gap-4")}>{item.title}</AccordionTrigger>
                    {item.items ? (
                      <ChapterSidebarNavItem items={item.items} pathname={pathname} progress={progress} />
                    ) : null}
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </nav>
        </div>
      ) : null}
    </>
  )
}

type ChapterSidebarNavItem = {
  items: ChapterSubNavItem[]
  pathname: string | null
  progress: number
}

export function ChapterSidebarNavItem({ items, pathname, progress }: ChapterSidebarNavItem) {
  return items.length ? (
    <AccordionContent className={cn("ml-3")}>
      {items.map((item) =>
        progress >= item.threshold ? (
          <Link
            key={item.title}
            href={item.href}
            className={cn("mr-2 flex w-full items-center rounded-md p-2 hover:underline", {
              "bg-muted": pathname === item.href,
            })}
          >
            {item.title}
          </Link>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60"
          >
            {item.title}
          </Link>
        )
      )}
    </AccordionContent>
  ) : null
}
