import { CourseResultData } from "@/types/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import TableClass from "../../(teacher)/kelas/_components/table"

type DashboardTeacherTableProps = {
  courses: CourseResultData[]
}

export default function DashboardTeacherTable({ courses }: Readonly<DashboardTeacherTableProps>) {
  const coursesSplit = courses.splice(0, 5)

  return (
    <Card x-chunk="dashboard-03-chunk-0">
      <CardHeader>
        <CardTitle>Daftar Kelas</CardTitle>
        <CardDescription>Daftar 5 kelas terbaru yang dimiliki.</CardDescription>
      </CardHeader>
      <CardContent>
        <TableClass courses={coursesSplit} />
      </CardContent>
    </Card>
  )
}
