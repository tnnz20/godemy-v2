import { UserAssessmentResultData } from "@/types/api"
import { GetUserAssessmentResult } from "@/lib/data/assessment/assessment-result"
import { CheckAssessmentValue, convertUnixToDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import DateClient from "@/components/date"

import QuizButton from "./quiz-button"

interface ChapterStartQuizButtonProps {
  token: string | undefined
  paramsId: string
}

export async function ChapterStartQuizButton({ token, paramsId }: Readonly<ChapterStartQuizButtonProps>) {
  const maxLength = paramsId === "7" ? 20 : 5
  const randomArrayId = generateRandomArray(1, maxLength)

  const usersAssessmentResults = await GetUserAssessmentResult(token as string, parseInt(paramsId))
  const isQuizPassed = CheckAssessmentValue(usersAssessmentResults)

  return (
    <div className="my-8 flex flex-col items-center justify-center gap-8">
      <QuizButton
        token={token as string}
        paramsId={paramsId}
        randomArrayId={randomArrayId}
        isQuizPassed={isQuizPassed}
      />
      {usersAssessmentResults?.code === 404 ? (
        <TableCaption>Tidak ada riwayat kuis</TableCaption>
      ) : (
        <HistoryUserAssessment userAssessmentResult={usersAssessmentResults?.data as UserAssessmentResultData[]} />
      )}
    </div>
  )
}
interface HistoryUserAssessmentProps {
  userAssessmentResult: UserAssessmentResultData[]
}

function HistoryUserAssessment({ userAssessmentResult }: Readonly<HistoryUserAssessmentProps>) {
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
        {userAssessmentResult
          ? userAssessmentResult.map((userAssessmentResult) => {
              const assessmentValue = userAssessmentResult?.assessment_value
              const date = userAssessmentResult?.created_at
              const formattedDate = convertUnixToDate(date)
              const options: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour12: false,
              }
              const status = userAssessmentResult?.status
              return (
                <TableRow key={userAssessmentResult?.id}>
                  <TableCell>
                    <DateClient date={formattedDate} locale={"id-ID"} options={options} />
                  </TableCell>
                  <TableCell>{userAssessmentResult?.assessment_code}</TableCell>
                  <TableCell>{assessmentValue}</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant={status === 1 ? "success" : "destructive"}>
                      {status === 1 ? "Lulus" : "Tidak Lulus"}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })
          : null}
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
