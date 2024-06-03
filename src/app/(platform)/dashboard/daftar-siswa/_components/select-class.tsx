"use client"

import { useShallow } from "zustand/react/shallow"

import { CoursesResultData } from "@/types/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useClassStore } from "../_store/useClassStore"

type SelectClassProps = {
  courses: CoursesResultData[]
}

export default function SelectClass({ courses }: Readonly<SelectClassProps>) {
  const [setCourseId] = useClassStore(useShallow((state) => [state.setCourseId]))

  return (
    <Select onValueChange={setCourseId}>
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
