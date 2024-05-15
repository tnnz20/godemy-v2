import { cookies } from "next/headers"

import { ChaptersConfig } from "@/types/chapters"
import { GetCourseEnrollment } from "@/lib/GetCourseEnrollment"

import ChapterSidebarNav from "./chapter-sidebar-nav"

interface ChapterSidebarNavWrapperProps {
  chapters: ChaptersConfig
}

export default async function ChapterSidebarNavWrapper({ chapters }: Readonly<ChapterSidebarNavWrapperProps>) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  const courseEnrollment = await GetCourseEnrollment(token)
  return <ChapterSidebarNav chapters={chapters} progress={courseEnrollment?.data?.progress} />
}
