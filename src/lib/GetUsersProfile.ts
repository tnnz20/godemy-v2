import { BASE_URL } from "@/constants/constants"

export async function GetUserProfile(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
