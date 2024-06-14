"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { CourseResultData, CoursesResult } from "@/types/api"
import { GetListCourses } from "@/lib/data/courses/course"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Icons } from "@/components/icons"

type SelectClassProps = {
  token: string
}

export default function SelectClass({ token }: Readonly<SelectClassProps>) {
  const [courses, setCourses] = useState<CoursesResult | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const courseId = searchParams.get("courseId")?.toString()
  const course_name = searchParams.get("course_name")?.toString() ?? ""

  const handleChange = (courseId: string) => {
    const params = new URLSearchParams(searchParams)

    if (courseId) {
      params.set("courseId", courseId)
    } else {
      params.delete("courseId")
    }
    replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    const fetchListCourses = async () => {
      setIsLoading(true)
      try {
        const courses = await GetListCourses(token, course_name)
        setCourses(courses)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListCourses()
  }, [course_name, token])

  let content
  if (courses?.code === 404) {
    content = (
      <div className="flex items-center justify-center">
        <span>Kelas tidak ditemukan</span>
      </div>
    )
  } else {
    content = courses?.data?.map((course: CourseResultData) => (
      <SelectItem key={course.id} value={course.id}>
        {course.course_name}
      </SelectItem>
    ))
  }

  return (
    <Select onValueChange={handleChange} defaultValue={courseId}>
      <SelectTrigger className="w-[240px]" aria-label="Select courses">
        <SelectValue placeholder="Pilih Kelas" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pilih Kelas</SelectLabel>
          {isLoading ? (
            <div className="flex h-20 items-center justify-center">
              <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            content
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
