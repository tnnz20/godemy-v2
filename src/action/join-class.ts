"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL, ErrValidation } from "@/constants/constants"
import { ClassSchema } from "@/validators/authSchema"

import { ClassSate } from "@/types/auth"

export async function JoinClass(prevState: ClassSate, formData: FormData) {
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
