import React from "react"

import { chaptersConfig } from "@/config/chapters"

import ChapterNav from "./_components/chapter-nav"

type ChaptersLayoutProps = {
  children: React.ReactNode
}

// TODO: FIX STYLING AND ADD SIDEBAR
export default function ChaptersLayout({ children }: Readonly<ChaptersLayoutProps>) {
  return (
    <div className="flex flex-col">
      <ChapterNav chaptersConfig={chaptersConfig} />
      <div className="">{children}</div>
    </div>
  )
}
