import React from "react"

import { Role } from "@/types/dashboard"

import DashboardStudentWrapper from "./_components/dashboard-student-wrapper"
import DashboardTeacherWrapper from "./_components/dashboard-teacher-wrapper"

export default function DashboardPage() {
  const role: Role = "student"

  return <>{role === "student" ? <DashboardStudentWrapper role={role} /> : <DashboardTeacherWrapper role={role} />}</>
}
