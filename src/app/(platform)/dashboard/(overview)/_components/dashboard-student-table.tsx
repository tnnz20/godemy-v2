import { cookies } from "next/headers"

import { UserAssessmentResultData } from "@/types/api"
import { GetUserAssessmentsResults } from "@/lib/GetUserAssessmentsResult"
import { FormattedDate } from "@/lib/utils"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function DashboardStudentTable() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  const UserAssessmentsResults = await GetUserAssessmentsResults(token as string)

  const isUserAssessmentResultsExist = UserAssessmentsResults !== 404

  const userResult = UserAssessmentsResults?.data
  return (
    <div>
      {isUserAssessmentResultsExist ? (
        <Table>
          <TableCaption>Riwayat Kuis</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Tipe Kuis</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userResult.map((item: UserAssessmentResultData) => {
              const assessmentValue = item.assessment_value
              const status = (assessmentValue as number) >= 80 ? "Lulus" : "Tidak Lulus"
              const date = String(item.created_at)
              const formattedDate = FormattedDate(date)
              return (
                <TableRow key={item.assessment_code}>
                  <TableCell className="font-medium">{formattedDate}</TableCell>
                  <TableCell>{item.assessment_code}</TableCell>
                  <TableCell>{assessmentValue}</TableCell>
                  <TableCell className={status === "Lulus" ? "text-green-700" : "text-destructive"}>{status}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableCaption>Anda tidak memiliki riwayat kuis</TableCaption>
        </Table>
      )}
    </div>
  )
}
