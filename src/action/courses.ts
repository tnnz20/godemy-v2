"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import {
  BASE_URL,
  ErrInternalServer,
  ErrValidation,
} from "@/constants/constants"
import { CourseSchema } from "@/validators/course-schema"

import { CreateCourseState } from "@/types/courses"

export async function CreateCourse(
  prevState: CreateCourseState,
  formData: FormData
) {
  const CreateCourseSchema = CourseSchema.omit({ code: true })

  const validateFields = CreateCourseSchema.safeParse({
    course_name: formData.get("course_name"),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: ErrValidation,
    }
  }

  const { course_name } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/courses/course/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
      body: JSON.stringify({ course_name }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { message: data?.error?.error_description }
    } else if (response.ok) {
      revalidateTag("courses")
      revalidateTag("total-courses")
      return { message: "Kelas berhasil dibuat" }
    } else {
      return { message: ErrInternalServer }
    }
  } catch (error) {
    console.error(error)
    return { message: `${error}` }
  }
}
