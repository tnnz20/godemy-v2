import { BASE_URL } from "@/constants/constants"

import { UsersProfile } from "@/types/api"

export async function GetUsersProfile(token: string): Promise<UsersProfile> {
  try {
    const response = await fetch(`${BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["user-profile"] },
    })

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(
        `status: ${response.status}, message: ${data?.error?.error_description}`
      )
    }
  } catch (error: any) {
    console.error(error)
    return {
      code: error.code,
      message: error.message,
    }
  }
}
