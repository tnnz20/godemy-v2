"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "@/constants/constants"
import { ClassSchema } from "@/validators/authSchema"

import { ClassSate } from "@/types/class"

// TODO: add constant for error message and fix this action
export async function JoinClass(prevState: ClassSate, formData: FormData) {
  const validateFields = ClassSchema.safeParse({
    code: formData.get("code"),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validations",
    }
  }

  const { code } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/class/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")}`,
      },
      body: JSON.stringify({ code }),
    })

    const data = await response.json()
    console.log("🚀 ~ JoinClass ~ data:", data)

    if (response.ok) {
      return { message: "Success" }
    } else {
      return { message: "Failed" }
    }
  } catch (error) {
    console.error(error)
    return { message: `${error}` }
  }
}
