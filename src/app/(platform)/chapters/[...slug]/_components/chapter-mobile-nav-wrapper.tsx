import { cookies } from "next/headers"

import { ChaptersConfig } from "@/types/chapters"
import { GetCourseEnrollment } from "@/lib/GetCourseEnrollment"

import ChapterMobileNav from "./chapter-mobile-nav"

interface ChapterMobileNavWrapperProps {
  chapters: ChaptersConfig
}

export default async function ChapterMobileNavWrapper({ chapters }: Readonly<ChapterMobileNavWrapperProps>) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  const courseEnrollment = await GetCourseEnrollment(token)

  return <ChapterMobileNav NavItems={chapters.NavItems} progress={courseEnrollment?.data?.progress} />
}
