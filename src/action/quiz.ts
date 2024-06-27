"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
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

      if (paramId === "7") {
        const response = await fetch(
          `${BASE_URL}/courses/course/enroll/progress`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ progress: 40 }),
          }
        )

        const data = await response.json()
        if (!response.ok) {
          throw new Error(
            `status: ${response.status}, message: ${data?.error?.error_description}`
          )
        }
        revalidateTag("course-enrollment")
      }
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

export async function StartQuiz(token: string, array: number[], id: string) {
  try {
    const response = await fetch(`${BASE_URL}/assessments/assessment/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        assessment_code: String(id),
        random_array_id: array,
      }),
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
