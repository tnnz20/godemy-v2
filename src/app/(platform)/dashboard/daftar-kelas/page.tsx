import { cookies } from "next/headers"

import { GetCourses } from "@/lib/GetCourses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Icons } from "@/components/icons"

import TableClass from "./_components/table"

export default async function DaftarKelasPage() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value
  const courses = await GetCourses(token as string)

  const totalCourse = courses?.data.length
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Icons.File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export PDF</span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <Icons.PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Tambah Kelas</span>
          </Button>
        </div>
      </div>
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader>
          <CardTitle>Daftar Kelas</CardTitle>
          <CardDescription>Daftar kelas yang dimiliki.</CardDescription>
        </CardHeader>
        <CardContent>
          <TableClass courses={courses?.data} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Menampilkan <strong>1-5</strong> dari <strong>{totalCourse}</strong> kelas
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
