"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "@/constants/constants"

export async function UpdateProgress(progress: number) {
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

    if (response.ok) {
      return {
        message: "Progress updated successfully",
      }
    }
  } catch (error) {
    console.error(error)
    return {
      message: "Internal server error",
    }
  }
}
