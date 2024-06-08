"use client"

import { use } from "react"
import { useParams } from "next/navigation"
import { StartQuiz } from "@/action/quiz"

import { UserAssessmentResultData } from "@/types/api"
import { GetUserAssessmentResult } from "@/lib/data/assessment/assessment-result"
import { CheckAssessmentValue, FormattedDate } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ChapterStartQuizButtonProps {
  token: string | undefined
}

export function ChapterStartQuizButton({ token }: Readonly<ChapterStartQuizButtonProps>) {
  const params = useParams()
  const paramId = params?.slug[0]

  const maxLength = paramId === "7" ? 20 : 5
  const randomArrayId = generateRandomArray(1, maxLength)

  const userAssessmentResult = use(GetUserAssessmentResult(parseInt(paramId), token as string))

  const isPassedQuiz = CheckAssessmentValue(userAssessmentResult)

  const handleStartQuiz = async () => {
    await StartQuiz(token as string, randomArrayId, paramId)
  }

  return (
    <div className="my-8 flex flex-col items-center justify-center gap-8">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isPassedQuiz}>Mulai kuis</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin akan memulai kuis?</AlertDialogTitle>
            <AlertDialogDescription>
              Ketika kuis dimulai anda tidak dapat kembali ke halaman sebelumnya.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction>
              <button onClick={async () => await handleStartQuiz()}>Lanjutkan</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {userAssessmentResult === 404 ? (
        <TableCaption>Tidak ada riwayat kuis</TableCaption>
      ) : (
        <HistoryUserAssessment userAssessmentResult={userAssessmentResult?.data} />
      )}
    </div>
  )
}
interface HistoryUserAssessmentProps {
  userAssessmentResult: UserAssessmentResultData
}

function HistoryUserAssessment({ userAssessmentResult }: Readonly<HistoryUserAssessmentProps>) {
  const assessmentValue = userAssessmentResult?.assessment_value
  const status = assessmentValue >= 80 ? "Lulus" : "Tidak Lulus"
  const date = String(userAssessmentResult?.created_at)
  const formattedDate = FormattedDate(date)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal Pelaksanaan</TableHead>
          <TableHead>Kode Kuis</TableHead>
          <TableHead>Nilai</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key={"user history"}>
          <TableCell className="font-medium">{formattedDate}</TableCell>
          <TableCell>{userAssessmentResult?.assessment_code}</TableCell>
          <TableCell>{assessmentValue}</TableCell>
          <TableCell>
            <Badge className="text-xs" variant={status === "Lulus" ? "success" : "destructive"}>
              {status}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function generateRandomArray(min: number, max: number) {
  const randomArray: number[] = []

  for (let i = min; i <= max; i++) {
    randomArray.push(i)
  }
  const sortedArray = randomArray.toSorted(() => Math.random() - 0.5)
  return sortedArray
}
