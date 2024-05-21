"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "@/constants/constants"

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
