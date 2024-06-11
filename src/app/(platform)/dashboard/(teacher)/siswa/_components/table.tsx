"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { EnrolledUsersDetailsData } from "@/types/api"
import { chaptersConfig } from "@/config/chapters"
import { GetEnrolledUsersDetails } from "@/lib/GetEnrolledUsersDetails"
import { FormattedDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Icons } from "@/components/icons"

export default function TableStudent() {
  const [data, setData] = useState<EnrolledUsersDetailsData[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")?.toString()
  const name = searchParams.get("name")?.toString() ?? ""
  const currentPage = parseInt(searchParams.get("page") ?? "1")

  const chapters = chaptersConfig.NavItems.flatMap((item) => item.items)
  const totalProgress = chapters.length - 1

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true)
      try {
        const EnrolledUsersDetail = await GetEnrolledUsersDetails(courseId as string, name, currentPage)
        setData(EnrolledUsersDetail?.data)
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
      {!courseId ? null : (
        <>
          {data ? (
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
                {data.map((user: EnrolledUsersDetailsData) => (
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
                    <TableCell>{FormattedDate(String(user.updated_at))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableCaption>Tidak ada siswa yang terdaftar.</TableCaption>
            </Table>
          )}
        </>
      )}
    </>
  )
}
