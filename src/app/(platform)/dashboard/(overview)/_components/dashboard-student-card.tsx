import { chaptersConfig } from "@/config/chapters"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// TODO: Implement API
export default function DashboardStudentCard() {
  const treshold = 17
  const totalTreshold = chaptersConfig.NavItems.flatMap((item) => item.items).length - 1

  const totalChapter = chaptersConfig.NavItems.length + 1
  const tresholdQuiz = 6
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Progress Kelas</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Saat ini anda belum menyelesaikan pembelajaran, silahkan lanjutkan pembelajaran anda.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Lanjutkan Pembelajaran</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Progress</CardDescription>
          <CardTitle className="text-4xl">{treshold + "/" + totalTreshold}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">-{totalTreshold - treshold} materi lagi</div>
        </CardContent>
        <CardFooter>
          <Progress value={(treshold / totalTreshold) * 100} aria-label={(treshold / totalTreshold) * 100 + "left"} />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>Kuis dikerjakan</CardDescription>
          <CardTitle className="text-4xl">{tresholdQuiz + "/" + totalChapter}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            tersisa {totalChapter - tresholdQuiz} kuis yang belum dikerjakan
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            value={(tresholdQuiz / totalChapter) * 100}
            aria-label={(tresholdQuiz / totalChapter) * 100 + "left"}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
