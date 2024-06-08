"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL, ErrValidation } from "@/constants/constants"
import { ClassSchema } from "@/validators/authSchema"

import { ClassSate } from "@/types/auth"

export async function EnrollCourse(prevState: ClassSate, formData: FormData) {
  const validateFields = ClassSchema.safeParse({
    code: formData.get("code"),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: ErrValidation,
    }
  }

  const { code } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/courses/course/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
      body: JSON.stringify({ course_code: code }),
    })

    const data = await response.json()

    if (!response.ok) {
      revalidatePath("/register/class")
      return { message: data.error.error_description }
    }
  } catch (error) {
    console.error(error)
    return { message: `${error}` }
  }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function UpdateProgress(formData: FormData) {
  const progress = parseInt(formData.get("progress") as string) + 1
  const nextPath = formData.get("path")

  const token = cookies().get("token")?.value
  try {
    const response = await fetch(`${BASE_URL}/courses/course/enroll/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress }),
    })

    const data = await response.json()
    if (response.ok) {
      revalidateTag("course-enrollment")
    } else {
      throw new Error(
        `status: ${response.status}, message: ${data?.error?.error_description}`
      )
    }
  } catch (error) {
    console.error(error)
  }

  revalidatePath(nextPath as string)
  redirect(nextPath as string)
}
