"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { BASE_URL } from "@/constants/constants"

export async function StartQuiz(token: string, array: number[], id: string) {
  try {
    const response = await fetch(`${BASE_URL}/assessments/assessment/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ assessment_code: id, random_array_id: array }),
    })
    const data = await response.json()
    if (response.status !== 201) {
      throw new Error(
        `status: ${response.status}, message: ${data?.error?.error_description}`
      )
    }
  } catch (error) {
    console.log(error)
  }
  revalidatePath("/chapters/quiz/started")
  redirect(`/chapters/quiz/started?quiz=${id}`)
}
