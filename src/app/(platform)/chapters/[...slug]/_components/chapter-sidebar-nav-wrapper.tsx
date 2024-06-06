import { cookies } from "next/headers"

import { ChaptersConfig } from "@/types/chapters"
import { chaptersConfig } from "@/config/chapters"
import { GetCourseEnrollment } from "@/lib/GetCourseEnrollment"

import ChapterSidebarNav from "./chapter-sidebar-nav"

export default async function ChapterSidebarNavWrapper() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  const chapters: ChaptersConfig = chaptersConfig

  const courseEnrollment = await GetCourseEnrollment(token)
  return <ChapterSidebarNav chapters={chapters} progress={courseEnrollment?.data?.progress} />
}
