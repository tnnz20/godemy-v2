"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { EnrolledUsersDetails, EnrolledUsersDetailsData } from "@/types/api"
import { chaptersConfig } from "@/config/chapters"
import { GetEnrolledUsersDetails } from "@/lib/data/courses/enrollment"
import { convertUnixToDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import DateClient from "@/components/date"
import { Icons } from "@/components/icons"

export default function TableStudent() {
  const [enrolledUsersData, setEnrolledUsersData] = useState<EnrolledUsersDetails>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")?.toString() ?? ""
  const name = searchParams.get("name")?.toString() ?? ""
  const currentPage = parseInt(searchParams.get("page") ?? "1")

  const chapters = chaptersConfig.NavItems.flatMap((item) => item.items)
  const totalProgress = chapters.length

  const isEnrolledUsersExist = enrolledUsersData?.code === 200
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true)
      try {
        const EnrolledUsersDetail = await GetEnrolledUsersDetails(courseId, name, currentPage)
        setEnrolledUsersData(EnrolledUsersDetail)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDataFromAPI()
  }, [courseId, name, currentPage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Icons.Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <>
      {isEnrolledUsersExist ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Progres</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Terakhir diperbaharui</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrolledUsersData?.data?.map((user: EnrolledUsersDetailsData) => {
              const date = user.updated_at
              const formattedDate = convertUnixToDate(date)
              const options: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour12: false,
              }
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      {String(((user.progress / totalProgress) * 100).toFixed(2))}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant={user.progress === totalProgress ? "success" : "destructive"}>
                      {user.progress === totalProgress ? "Selesai" : "Belum Selesai"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DateClient date={formattedDate} locale={"id-ID"} options={options} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableCaption>
            {!courseId && <p>Silahkan pilih kelas terlebih dahulu</p>}
            {courseId && <p>Belum ada siswa yang terdaftar pada kelas ini</p>}
          </TableCaption>
        </Table>
      )}
    </>
  )
}
