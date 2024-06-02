import { BASE_URL } from "@/constants/constants"

export async function GetTotalCourses(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/courses/total`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
