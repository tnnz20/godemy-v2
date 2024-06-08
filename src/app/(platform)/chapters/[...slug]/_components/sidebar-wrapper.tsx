import { cookies } from "next/headers"

import { ChaptersConfig } from "@/types/chapters"
import { chaptersConfig } from "@/config/chapters"
import { GetCourseEnrollmentDetail } from "@/lib/data/courses/enrollment"

import ChapterSidebarNav from "./sidebar-nav"

export default async function ChapterSidebarWrapper() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  const chapters: ChaptersConfig = chaptersConfig

  const courseEnrollment = await GetCourseEnrollmentDetail(token)
  return <ChapterSidebarNav chapters={chapters} progress={courseEnrollment?.data?.progress} />
}
