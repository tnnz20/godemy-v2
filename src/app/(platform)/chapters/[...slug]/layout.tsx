import React from "react"

import { chaptersConfig } from "@/config/chapters"

import ChapterNav from "./_components/chapter-nav"
import ChapterSidebarNav from "./_components/chapter-sidebar-nav"

type ChaptersLayoutProps = {
  children: React.ReactNode
}

export default function ChaptersLayout({ children }: Readonly<ChaptersLayoutProps>) {
  return (
    <div className="flex flex-col">
      <ChapterNav chaptersConfig={chaptersConfig} />
      <div className="flex gap-2 overflow-hidden">
        <div className="flex flex-1">{children}</div>
        <ChapterSidebarNav chaptersConfig={chaptersConfig} />
      </div>
    </div>
  )
}
