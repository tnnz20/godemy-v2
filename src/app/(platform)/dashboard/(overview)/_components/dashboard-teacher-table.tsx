import { CoursesResultData } from "@/types/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import TableClass from "../../(teacher)/daftar-kelas/_components/table"

type DashboardTeacherTableProps = {
  courses: CoursesResultData[]
}

export default function DashboardTeacherTable({ courses }: Readonly<DashboardTeacherTableProps>) {
  return (
    <Card x-chunk="dashboard-02-chunk-3">
      <CardHeader>
        <CardTitle>Daftar Kelas</CardTitle>
        <CardDescription>Daftar kelas yang dimiliki.</CardDescription>
      </CardHeader>
      <CardContent>
        <TableClass courses={courses} />
      </CardContent>
    </Card>
  )
}
