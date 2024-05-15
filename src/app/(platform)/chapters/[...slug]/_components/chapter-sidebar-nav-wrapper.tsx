import { cookies } from "next/headers"
import { BASE_URL } from "@/constants/constants"

import { ChaptersConfig } from "@/types/chapters"

import ChapterSidebarNav from "./chapter-sidebar-nav"

type ChapterSidebarNavWrapperProps = {
  chapters: ChaptersConfig
}

async function GetCourseEnrollment(token: string | undefined) {
  try {
    const response = await fetch(`${BASE_URL}/courses/course/enroll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["course-enrollment"] },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export default async function ChapterSidebarNavWrapper({ chapters }: Readonly<ChapterSidebarNavWrapperProps>) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  const courseEnrollment = await GetCourseEnrollment(token)
  return <ChapterSidebarNav chapters={chapters} progress={courseEnrollment?.data?.progress} />
}
