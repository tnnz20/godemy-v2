import { cookies } from "next/headers"

import { ChaptersConfig } from "@/types/chapters"
import { GetCourseEnrollmentDetail } from "@/lib/data/courses/enrollment"

import ChapterMobileNav from "./mobile-nav"

interface ChapterMobileNavWrapperProps {
  chapters: ChaptersConfig
}

export default async function ChapterMobileNavWrapper({ chapters }: Readonly<ChapterMobileNavWrapperProps>) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  const courseEnrollment = await GetCourseEnrollmentDetail(token)

  return <ChapterMobileNav NavItems={chapters.NavItems} progress={courseEnrollment?.data?.progress} />
}
