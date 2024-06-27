import { UserAssessmentResultData } from "@/types/api"
import { GetUserAssessmentResult } from "@/lib/data/assessment/assessment-result"
import { convertUnixToDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StudentQuizTableProps {
  token: string
  assessmentCode: number
}

export default async function StudentQuizTable({ token, assessmentCode }: Readonly<StudentQuizTableProps>) {
  const UserAssessmentsResult = await GetUserAssessmentResult(token, assessmentCode)

  const isUserAssessmentResultsExist = UserAssessmentsResult.code !== 404

  const userResult = UserAssessmentsResult?.data

  return (
    <div className="flex flex-col gap-4">
      {isUserAssessmentResultsExist ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Tipe Kuis</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userResult?.map((item: UserAssessmentResultData) => {
              const assessmentValue = item.assessment_value
              const date = item.created_at
              const formattedDate = convertUnixToDate(date).toLocaleString()
              const status = item?.status

              const code = item.assessment_code === "chap-7" ? "evaluasi" : item.assessment_code
              return (
                <TableRow key={item.assessment_code}>
                  <TableCell className="font-medium">{formattedDate}</TableCell>
                  <TableCell>{code}</TableCell>
                  <TableCell>{assessmentValue}</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant={status === 1 ? "success" : "destructive"}>
                      {status === 1 ? "Lulus" : "Tidak Lulus"}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableCaption>Anda belum memiliki riwayat kuis</TableCaption>
        </Table>
      )}
    </div>
  )
}
