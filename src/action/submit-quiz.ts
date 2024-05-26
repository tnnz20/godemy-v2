"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { BASE_URL } from "@/constants/constants"

export async function SubmitQuiz(score: number, paramId: string) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  try {
    const response = await fetch(`${BASE_URL}/assessments/assessment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        assessment_value: score,
        assessment_code: paramId,
      }),
    })
    const data = await response.json()
    if (response.ok) {
      revalidateTag("assessment-result")
    } else {
      throw new Error(
        `status: ${response.status}, message: ${data?.error?.error_description}`
      )
    }
  } catch (error) {
    console.error(error)
    return error
  }
  revalidatePath(`chapters/${paramId}/kuis`)
}
