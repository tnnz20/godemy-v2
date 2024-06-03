import { BASE_URL } from "@/constants/constants"

export async function GetEnrolledUsersDetails(courseId: string, name: string) {
  try {
    const response = await fetch(`${BASE_URL}/courses/course/${courseId}/enrolled?name=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    })

    const data = await response.json()
    if (response.ok) {
      return data
    } else if (response.status === 404) {
      return data?.code
    } else {
      throw new Error(`status: ${response.status}, message: ${data?.error?.error_description}`)
    }
  } catch (error) {
    console.log(error)
  }
}
