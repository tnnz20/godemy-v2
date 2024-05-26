import { BASE_URL } from "@/constants/constants"

export async function GetUserAssessmentsResults(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/assessments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    const data = await response.json()

    if (response.ok) {
      return data
    } else if (response.status === 404) {
      return data?.code
    } else {
      throw new Error(
        `status: ${response.status}, message: ${data?.error?.error_description}`
      )
    }
  } catch (error) {
    console.log(error)
  }
}
