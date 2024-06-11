import { BASE_URL } from "@/constants/constants"

import { CoursesResult, TotalDataResponse } from "@/types/api"

export async function GetTotalCourses(
  token: string,
  course_name: string
): Promise<TotalDataResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/courses/total?course_name=${course_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: { tags: ["total-courses"] },
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

export async function GetCourses(
  token: string,
  page: number,
  course_name: string = ""
): Promise<CoursesResult> {
  try {
    const nextItem = page === 1 ? 0 : (page - 1) * 6
    const response = await fetch(
      `${BASE_URL}/courses?course_name=${course_name}&offset=${nextItem}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: { tags: ["courses"] },
      }
    )

    const data = await response.json()

    return data as CoursesResult
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

export async function GetListCourses(
  token: string,
  course_name: string = ""
): Promise<CoursesResult> {
  try {
    const response = await fetch(
      `${BASE_URL}/courses/list?course_name=${course_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: { tags: ["courses-list"] },
      }
    )

    const data = await response.json()

    return data as CoursesResult
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
