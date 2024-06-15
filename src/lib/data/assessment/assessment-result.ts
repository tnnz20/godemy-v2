import { BASE_URL } from "@/constants/constants"

import {
  AssessmentResultUsers,
  TotalDataResponse,
  UserAssessmentResult,
} from "@/types/api"

export async function GetUserAssessmentResult(
  token: string,
  assessment_code: number
): Promise<UserAssessmentResult> {
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
    return data
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

export async function GetAssessmentResultUsers(
  token: string,
  courseId: string,
  assessment_code: string,
  status: string,
  name: string,
  sort: string,
  page: string
): Promise<AssessmentResultUsers> {
  const nextItem = parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * 6
  try {
    const response = await fetch(
      `${BASE_URL}/assessments/assessment/${courseId}?assessment_code=chap-${assessment_code}&name=${name}&status=${status}&sort=${sort}&offset=${nextItem}`,
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
    return data
  } catch (error: any) {
    console.log(error)
    return {
      code: error.code,
      error: {
        error_name: "InternalServerError",
        error_description: error.message,
      },
    }
  }
}

export async function GetTotalAssessmentResultUsers(
  token: string,
  courseId: string,
  assessment_code: string,
  name: string
): Promise<TotalDataResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/assessments/assessment/${courseId}/total?assessment_code=chap-${assessment_code}&name=${name}`,
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
    return data
  } catch (error: any) {
    console.log(error)
    return {
      code: error.code,
      error: {
        error_name: "InternalServerError",
        error_description: error.message,
      },
    }
  }
}
