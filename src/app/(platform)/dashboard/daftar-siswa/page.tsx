import { cookies } from "next/headers"

import { GetCourses } from "@/lib/GetCourses"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import DashboardPagination from "./_components/pagination"
import SearchStudent from "./_components/search-input"
import SelectClass from "./_components/select-class"
import TableStudent from "./_components/table"

export default async function ListStudentPage() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value
  const courses = await GetCourses(token as string)

  return (
    <div className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mt-4 flex items-center">
        <SelectClass courses={courses?.data} />
        <div className="ml-auto flex items-center gap-2">
          <SearchStudent />
        </div>
      </div>
      <Card x-chunk="dashboard-03-chunk-1">
        <CardHeader>
          <CardTitle>Daftar Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <TableStudent />
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-end">
          <DashboardPagination />
        </CardFooter>
      </Card>
    </div>
  )
}
