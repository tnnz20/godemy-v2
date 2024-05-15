"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "@/constants/constants"

export async function UpdateProgress(progress: number, nextPath: string) {
  const token = cookies().get("token")?.value
  console.log(nextPath)
  try {
    const response = await fetch(`${BASE_URL}/courses/course/enroll/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress }),
    })

    if (response.ok) {
      revalidateTag("course-enrollment")
    }
  } catch (error) {
    console.error(error)
    return {
      message: "Internal server error",
    }
  }
  revalidatePath(nextPath)
  redirect(nextPath)
}
