"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { AssessmentResultUsers, AssessmentResultUsersData } from "@/types/api"
import { GetAssessmentResultUsers } from "@/lib/data/assessment/assessment-result"
import { convertUnixToDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Icons } from "@/components/icons"

interface ScoreTableProps {
  token: string
}

export default function ScoreTable({ token }: Readonly<ScoreTableProps>) {
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResultUsers>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()

  const courseId = searchParams.get("courseId")?.toString() ?? ""
  const name = searchParams.get("name")?.toString() ?? ""
  const code = searchParams.get("code")?.toString() ?? ""
  const currentPage = searchParams.get("page") ?? "1"
  const status = searchParams.get("status") ?? "0"
  const sort = searchParams.get("sort") ?? "ASC"

  const isAssessmentResultsExist = assessmentResults?.code === 200
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true)
      try {
        const AssessmentResultUsers = await GetAssessmentResultUsers(
          token,
          courseId,
          code,
          status,
          name,
          sort,
          currentPage
        )
        setAssessmentResults(AssessmentResultUsers)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDataFromAPI()
  }, [courseId, name, currentPage, token, code, status, sort])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Icons.Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {isAssessmentResultsExist ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Tipe Kuis</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal Pelaksaan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessmentResults?.data?.map((item: AssessmentResultUsersData) => {
              const date = item.created_at
              const formattedDate = convertUnixToDate(date).toLocaleString()
              const status = item?.status

              const code = item.assessment_code === "chap-7" ? "evaluasi" : item.assessment_code
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.users_id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{code}</TableCell>
                  <TableCell>{item.assessment_value}</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant={status === 1 ? "success" : "destructive"}>
                      {status === 1 ? "Lulus" : "Tidak Lulus"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{formattedDate}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableCaption>
            {!courseId && <p>Silahkan pilih kelas terlebih dahulu</p>}
            {courseId && !code && <p>Pilih kategori terlebih dahulu</p>}
            {courseId && code && <p>Tidak ada riwayat kuis pada kelas ini</p>}
          </TableCaption>
        </Table>
      )}
    </div>
  )
}
