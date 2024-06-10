import { cookies } from "next/headers"

import { DecodeJWT } from "@/lib/utils"

import DashboardStudentWrapper from "./_components/student-wrapper"
import DashboardTeacherWrapper from "./_components/teacher-wrapper"

export default function DashboardPage() {
  const cookieStore = cookies()
  const jwtToken = cookieStore.get("token")

  const { role } = DecodeJWT(jwtToken?.value)
  const isStudent = role === "student"

  return <>{isStudent ? <DashboardStudentWrapper /> : <DashboardTeacherWrapper />}</>
}
