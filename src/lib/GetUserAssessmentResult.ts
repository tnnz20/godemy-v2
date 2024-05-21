import { BASE_URL } from "@/constants/constants"

export async function GetAssessmentResultUser(
  assessment_code: number,
  token: string
) {
  try {
    const response = await fetch(
      `${BASE_URL}/assessments/assessment?assessment_code=chap-${assessment_code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["assessment-result"] },
      }
    )

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(
        `status: ${response.status}, message: ${data?.error?.error_description}`
      )
    }
  } catch (error) {
    console.log(error)
  }
}
