import { BASE_URL } from "@/constants/constants"

export async function GetAssessmentUser(
  token: string | undefined,
  assessment_code: string
) {
  try {
    const response = await fetch(
      `${BASE_URL}/assessments/assessment/users?assessment_code=chap-${assessment_code}`,
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
      throw new Error(
        `status: ${response.status}, message: ${data?.error?.error_description}`
      )
    }
  } catch (error) {
    console.log(error)
  }
}
