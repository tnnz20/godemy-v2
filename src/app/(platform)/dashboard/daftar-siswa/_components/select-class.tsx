"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { CoursesResultData } from "@/types/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SelectClassProps = {
  courses: CoursesResultData[]
}

export default function SelectClass({ courses }: Readonly<SelectClassProps>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const courseId = searchParams.get("courseId")?.toString()
  const handleChange = (courseId: string) => {
    const params = new URLSearchParams(searchParams)

    if (courseId) {
      params.set("courseId", courseId)
    } else {
      params.delete("courseId")
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select onValueChange={handleChange} defaultValue={courseId}>
      <SelectTrigger className="w-[240px]" aria-label="Select courses">
        <SelectValue placeholder="Pilih Kelas" />
      </SelectTrigger>
      <SelectContent>
        {courses?.map((course: CoursesResultData) => (
          <SelectItem key={course.id} value={course.id}>
            {course.course_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
