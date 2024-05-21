import { BASE_URL } from "@/constants/constants"

export async function GetAssessmentResultUser(chapter: number, token: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/assessments/assessment/chap-${chapter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.log(data)
    }
  } catch (error) {
    console.log(error)
  }
}
