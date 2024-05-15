import { cookies } from "next/headers"

import { DecodeJWT } from "@/lib/utils"

import DashboardStudentWrapper from "./_components/dashboard-student-wrapper"
import DashboardTeacherWrapper from "./_components/dashboard-teacher-wrapper"

export default function DashboardPage() {
  const cookieStore = cookies()
  const jwtToken = cookieStore.get("token")

  const { role } = DecodeJWT(jwtToken?.value)

  return <>{role === "student" ? <DashboardStudentWrapper /> : <DashboardTeacherWrapper />}</>
}
