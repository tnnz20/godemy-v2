import { BASE_URL } from "@/constants/constants"

export async function GetCourseEnrollment(token: string | undefined) {
  try {
    const response = await fetch(`${BASE_URL}/courses/course/enroll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["course-enrollment"] },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
