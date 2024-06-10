import { BASE_URL } from "@/constants/constants"

export async function GetUsersProfile(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
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
  } catch (error) {
    console.error(error)
  }
}
