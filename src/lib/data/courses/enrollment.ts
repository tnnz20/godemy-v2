import { BASE_URL } from "@/constants/constants"

export async function GetCourseEnrollmentDetail(token: string | undefined) {
  try {
    const response = await fetch(`${BASE_URL}/courses/course/enroll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
      next: { tags: ["course-enrollment"] },
    })

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
