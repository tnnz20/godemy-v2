"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { ChaptersConfig, ChapterSubNavItem } from "@/types/chapters"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

type ChapterSidebarNavProps = {
  chaptersConfig: ChaptersConfig
}

export default function ChapterSidebarNav({ chaptersConfig }: Readonly<ChapterSidebarNavProps>) {
  const items = chaptersConfig.NavItems
  const pathname = usePathname()
  const [showSideNav, setShowSideNav] = useState<boolean>(true)

  const currentOpenPage = items.find((section) => section.items?.some((item) => item.href === pathname))
  const currentIndexPage = items.findIndex((section) => section?.title === currentOpenPage?.title)
  return (
    <>
      {!showSideNav ? (
        <Button
          aria-label="SideNav Open Toggle"
          onClick={() => setShowSideNav(true)}
          className="border-r-lg fixed -right-3 top-20 z-20 hidden md:inline-block"
        >
          <Icons.List className={cn("rotate-180")} />
        </Button>
      ) : null}

      {items.length ? (
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: showSideNav ? 0 : "100vw" }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className={cn(
            "fixed right-0 top-14 z-30 h-[calc(100vh-3.5rem)] overflow-y-auto border-l px-4 py-6 md:block",
            {
              "translate-x-0": showSideNav,
              "translate-x-[100vw]": !showSideNav,
            }
          )}
        >
          <div className="mr-2 flex items-center justify-between">
            <Button
              aria-label="SideNav Close Toggle"
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
                    {item.items ? <ChapterSidebarNavItem items={item.items} pathname={pathname} /> : null}
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </nav>
        </motion.div>
      ) : null}
    </>
  )
}

type ChapterSidebarNavItem = {
  items: ChapterSubNavItem[]
  pathname: string | null
}

export function ChapterSidebarNavItem({ items, pathname }: ChapterSidebarNavItem) {
  return items.length ? (
    <AccordionContent className={cn("ml-3")}>
      {items.map((item) =>
        //TODO: change disabled to threshold
        !item.disabled && item.href ? (
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
          <span className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60" key={item.title}>
            {item.title}
          </span>
        )
      )}
    </AccordionContent>
  ) : null
}
