import { Metadata } from "next"
import { cookies } from "next/headers"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import StudentPagination from "./_components/pagination"
import SearchStudent from "./_components/search-input"
import SelectClass from "./_components/select-class"
import TableStudent from "./_components/table"

export const metadata: Metadata = {
  title: "Siswa",
  description: "Student page list student based on class in godemy platform",
}

export default async function StudentPage() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  return (
    <div className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mt-4 flex items-center">
        <SelectClass token={token as string} />
        <div className="ml-auto flex items-center gap-2">
          <SearchStudent />
        </div>
      </div>
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader>
          <CardTitle>Daftar Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <TableStudent />
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-end">
          <StudentPagination />
        </CardFooter>
      </Card>
    </div>
  )
}
