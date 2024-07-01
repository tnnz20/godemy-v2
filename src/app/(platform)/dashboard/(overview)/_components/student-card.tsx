import { cookies } from "next/headers"
import Link from "next/link"

import { chaptersConfig } from "@/config/chapters"
import { GetCourseEnrollmentDetail } from "@/lib/data/courses/enrollment"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default async function DashboardStudentCard() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  const CourseEnrollment = await GetCourseEnrollmentDetail(token)

  let isUserEnroll: boolean = CourseEnrollment?.code === 200

  const progress = CourseEnrollment?.data?.progress

  const chapters = chaptersConfig.NavItems.flatMap((item) => item.items)
  const totalProgress = chapters.length
  const isFinished = progress === totalProgress

  const chaptersQuiz = chapters.filter((item) => item.title.toLowerCase() === "kuis")
  const thresholdQuizArray = chaptersQuiz.map((item) => item.threshold)
  let progressQuiz: number = 0

  for (const threshold of thresholdQuizArray) {
    if (progress >= threshold) {
      progressQuiz++
    }
  }

  const usersProgress = chapters.filter((item) => item.threshold === progress)
  const progressLink = isFinished ? "/chapters/1/pendahuluan/" : usersProgress[0].href
  return (
    <>
      {isUserEnroll ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-01-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Progress Belajar</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                {isFinished
                  ? "Selamat anda telah menyelesaikan pembelajaran."
                  : "Saat ini anda belum menyelesaikan pembelajaran, silahkan lanjutkan pembelajaran anda."}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={progressLink}>{isFinished ? "Lihat Materi" : "Lanjutkan Pembelajaran"}</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Progres Belajar</CardDescription>
              <CardTitle className="text-4xl">{progress + "/" + totalProgress}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {isFinished ? null : `tersisa ${totalProgress - progress} materi lagi`}
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={(progress / totalProgress) * 100}
                aria-label={(progress / totalProgress) * 100 + "left"}
              />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Kuis dikerjakan</CardDescription>
              <CardTitle className="text-4xl">{progressQuiz + "/" + thresholdQuizArray.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {isFinished ? null : `tersisa ${thresholdQuizArray.length - progressQuiz} kuis`}
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={(progressQuiz / thresholdQuizArray.length) * 100}
                aria-label={(progressQuiz / thresholdQuizArray.length) * 100 + "left"}
              />
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-01-chunk-3">
            <CardHeader className="pb-3">
              <CardTitle>Belum terdaftar pada kelas</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Saat ini anda belum terdaftar pada kelas, silahkan tanya kepada guru anda untuk kode kelas.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={"/courses/enroll"}>Masukan kode</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
