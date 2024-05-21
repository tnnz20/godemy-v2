"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "@/constants/constants"

export async function UpdateStatus(assessment_code: string, status: number) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  try {
    const response = await fetch(
      `${BASE_URL}/assessments/assessment/users/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          assessment_code: `chap-${assessment_code}`,
          status: status,
        }),
      }
    )
    const data = await response.json()
    if (!response.ok) {
      throw new Error(
        `status: ${response.status}, message: ${data?.error?.error_description}`
      )
    }
  } catch (error) {
    console.log(error)
  }
  revalidatePath(`/chapters/quiz/${assessment_code}`)
  redirect(`/chapters/quiz/${assessment_code}`)
}
