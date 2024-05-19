import { BASE_URL } from "@/constants/constants"

export async function GetAssessmentUser(
  TOKEN: string | undefined,
  Assessment_Code: string
) {
  try {
    const response = await fetch(
      `${BASE_URL}/assessments/assessment/users?assessment_code=chap-${Assessment_Code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    )

    const data = await response.json()
    if (response.ok) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}
