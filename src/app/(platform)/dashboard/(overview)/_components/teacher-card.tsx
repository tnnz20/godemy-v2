import { cookies } from "next/headers"
import Link from "next/link"

import { GetTotalCourses } from "@/lib/data/courses/course"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardTeacherCard() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  const totalCourses = await GetTotalCourses(token as string, "")
  const total = totalCourses?.data?.total

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="sm:col-span-2" x-chunk="dashboard-01-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Kelola kelas</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            {total ? "Kelola kelas yang dimiliki" : "Anda belum memiliki kelas. Silahkan buat kelas terlebih dahulu"}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href="/dashboard/daftar-kelas">{total ? "Lihat kelas" : "Buat kelas"}</Link>
          </Button>
        </CardFooter>
      </Card>
      {!total ? null : (
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Kelas</CardDescription>
            <CardTitle className="text-4xl">{total}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">jumlah kelas yang dimiliki</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
