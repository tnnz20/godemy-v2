import { cookies } from "next/headers"

import { UserAssessmentResultData } from "@/types/api"
import { GetUserAssessmentsResults } from "@/lib/data/assessment/assessment-result"
import { FormattedDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function DashboardStudentTable() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  const UserAssessmentsResults = await GetUserAssessmentsResults(token as string)

  const isUserAssessmentResultsExist = UserAssessmentsResults !== 404

  const userResult = UserAssessmentsResults?.data

  return (
    <div>
      <Card x-chunk="dashboard-03-chunk-0">
        <CardHeader className="px-7">
          <CardTitle>Riwayat Kuis</CardTitle>
          <CardDescription>Riwayat terakhir kuis yang telah diikuti</CardDescription>
        </CardHeader>
        <CardContent>
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
                  {userResult.map((item: UserAssessmentResultData) => {
                    const assessmentValue = item.assessment_value
                    const status = assessmentValue >= 80 ? "Lulus" : "Tidak Lulus"
                    const date = String(item.created_at)
                    const formattedDate = FormattedDate(date)
                    return (
                      <TableRow key={item.assessment_code}>
                        <TableCell className="font-medium">{formattedDate}</TableCell>
                        <TableCell>{item.assessment_code}</TableCell>
                        <TableCell>{assessmentValue}</TableCell>
                        <TableCell>
                          <Badge className="text-xs" variant={status === "Lulus" ? "success" : "destructive"}>
                            {status}
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
        </CardContent>
      </Card>
    </div>
  )
}
