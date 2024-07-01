import { BASE_URL } from "@/constants/constants"

import { EnrolledUsersDetails, TotalDataResponse } from "@/types/api"

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

export async function GetTotalEnrolledUsers(
  courseId: string,
  name: string
): Promise<TotalDataResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/courses/course/${courseId}/enrolled/total?name=${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    )

    const data = await response.json()

    return data as TotalDataResponse
  } catch (error: any) {
    console.log(error)
    return {
      code: 500,
      error: {
        error_name: "InternalServerError",
        error_description: error.message,
      },
    }
  }
}

export async function GetEnrolledUsersDetails(
  courseId: string,
  name: string,
  page: number
): Promise<EnrolledUsersDetails> {
  try {
    const nextItem = page === 1 ? 0 : (page - 1) * 6
    const response = await fetch(
      `${BASE_URL}/courses/course/${courseId}/enrolled?name=${name}&offset=${nextItem}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    )

    const data = await response.json()
    return data as EnrolledUsersDetails
  } catch (error: any) {
    return {
      code: 500,
      error: {
        error_name: "InternalServerError",
        error_description: error.message,
      },
    }
  }
}
