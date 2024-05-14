"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  BASE_URL,
  ErrConflict,
  ErrInternalServer,
  ErrValidation,
} from "@/constants/constants"
import { AuthSchema } from "@/validators/authSchema"

import { RegisterState } from "@/types/auth"

export async function Register(prevState: RegisterState, formData: FormData) {
  const validateFields = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    gender: formData.get("gender"),
    role: formData.get("role"),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: ErrValidation,
    }
  }

  const { name, email, password, role } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    })

    if (!response.ok) {
      if (response.status == 409) {
        return { message: ErrConflict }
      } else {
        return { message: ErrInternalServer }
      }
    }
  } catch (error) {
    return { message: `${error}` }
  }

  revalidatePath("/login")
  redirect("/login")
}
