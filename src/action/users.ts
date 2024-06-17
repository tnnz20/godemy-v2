"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { BASE_URL, ErrValidation } from "@/constants/constants"
import { UsersSchema } from "@/validators/users-schema"

import { UsersState } from "@/types/auth"

export async function UpdateUsers(prevState: UsersState, formData: FormData) {
  const token = cookies().get("token")?.value

  const validateFields = UsersSchema.safeParse({
    name: formData.get("name"),
    gender: formData.get("gender"),
    address: formData.get("address"),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: ErrValidation,
    }
  }

  const profile_img = formData.get("profile_img") ?? ""
  const date = formData.get("date")

  const { name, gender, address } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/users/profile/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, date, address, gender, profile_img }),
    })

    const data = await response.json()
    if (!response.ok) {
      console.log(data)
      throw new Error(data?.message)
    }
  } catch (error: any) {
    console.log(error)
    return {
      message: error.message,
    }
  }
  revalidateTag("user-profile")
  revalidatePath("/settings/profiles")
}
