"use client"

import React from "react"
import Link from "next/link"
import { UpdateProgress } from "@/action/update-progress"
import { Chapter } from "#site/content"

import { ChaptersNavItem } from "@/types/chapters"
import { chaptersConfig } from "@/config/chapters"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

interface PagerProps {
  chapter: Chapter
}

export default function ChapterPager({ chapter }: Readonly<PagerProps>) {
  const pager = getPagerForDoc(chapter)
  if (!pager) return null

  const progress = chapter?.progress

  return (
    <div
      className={cn("mb-4 flex flex-row items-center justify-between", {
        "justify-end": !pager?.prev,
        "justify-start": !pager.next,
      })}
    >
      {pager?.prev && (
        <div>
          <Button variant={"ghost"} asChild>
            <Link href={pager.prev.href} className="flex flex-row items-center text-xs md:text-sm">
              <Icons.ChevronLeft className="ml-2 h-4 w-4" />
              {pager.prev.title}
            </Link>
          </Button>
        </div>
      )}

      {pager?.next && (
        <div>
          <Button variant={"ghost"} className="ml-auto" onClick={async () => await UpdateProgress(progress + 1)}>
            <Link href={pager.next.href} className="flex flex-row items-center text-xs md:text-sm">
              {pager.next.title}
              <Icons.ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

function getPagerForDoc(chapter: Chapter) {
  const flattenedLinks = [null, ...flatten(chaptersConfig.NavItems), null]
  const activeIndex = flattenedLinks.findIndex((link) => "/" + chapter?.slug === link?.href)
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next = activeIndex !== flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null

  return {
    prev,
    next,
  }
}

function flatten(links: ChaptersNavItem[]) {
  return links.map((link) => link.items?.map((item) => item)).flat(2)
}
