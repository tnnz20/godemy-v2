"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { CourseResultData, CoursesResult, TotalDataResponse } from "@/types/api"
import { GetCourses, GetTotalCourses } from "@/lib/data/courses/course"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableCaption } from "@/components/ui/table"

import { Icons } from "@/components/icons"

import ClassPagination from "./pagination"
import TableClass from "./table"

interface ClassCardProps {
  token: string
}

// TODO: reload fetching when adding new course

export default function ClassCard({ token }: Readonly<ClassCardProps>) {
  const [courses, setCourses] = useState<CoursesResult | null>(null)
  const [totalCourses, setTotalCourses] = useState<TotalDataResponse | null>(null)

  const [errorCourses, setErrorCourses] = useState<string>("")

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const courseName = searchParams.get("course_name")?.toString() ?? ""
  const currentPage = parseInt(searchParams.get("page") ?? "1")

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true)
      try {
        const courses: CoursesResult = await GetCourses(token, currentPage, courseName)
        setCourses(courses)

        const totalCourses = await GetTotalCourses(token, courseName)
        setTotalCourses(totalCourses)
      } catch (error: any) {
        console.log(error)
        setErrorCourses(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDataFromAPI()
  }, [courseName, currentPage, token])

  let content
  if (courses?.code === 404) {
    content = (
      <Table>
        <TableCaption>Data tidak ditemukan</TableCaption>
      </Table>
    )
  } else {
    content = <TableClass courses={courses?.data as CourseResultData[]} />
  }

  if (errorCourses) {
    content = (
      <Table>
        <TableCaption>{errorCourses}</TableCaption>
      </Table>
    )
  }

  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader>
        <CardTitle>Daftar Kelas</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Icons.Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          content
        )}
      </CardContent>
      <CardFooter className="flex items-end justify-end">
        <ClassPagination data={totalCourses as TotalDataResponse} />
      </CardFooter>
    </Card>
  )
}
