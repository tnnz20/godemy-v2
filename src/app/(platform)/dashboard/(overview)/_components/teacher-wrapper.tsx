import { cookies } from "next/headers"

import { GetCourses } from "@/lib/data/courses/course"

import DashboardProfile from "./profile-card"
import DashboardTeacherCard from "./teacher-card"
import DashboardTeacherTable from "./teacher-table"

export default async function DashboardTeacherWrapper() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  const courses = await GetCourses(token as string)

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <DashboardTeacherCard />
        <DashboardTeacherTable courses={courses?.data} />
      </div>
      <DashboardProfile />
    </div>
  )
}
