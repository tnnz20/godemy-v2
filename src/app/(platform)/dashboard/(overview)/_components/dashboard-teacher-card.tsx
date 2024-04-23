import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardTeacherCard() {
  const kelas = 2
  const kelasA = 10
  const kelasB = 5
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Kelas</CardDescription>
          <CardTitle className="text-4xl">{kelas}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">Anda mengelola {kelas}</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>Jumlah siswa</CardDescription>
          <CardTitle className="text-4xl">{kelasA + kelasB}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Jumlah tersebut berdasarkan penjumlahan dari {kelas} kelas
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
