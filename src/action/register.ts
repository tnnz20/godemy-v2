"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "@/constants/constants"
import { RegisterSchema } from "@/validators/register"

import { RegisterState } from "@/types/register"

export async function signUp(prevState: RegisterState, formData: FormData) {
  const validateFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    gender: formData.get("gender"),
    role: formData.get("role"),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validations",
    }
  }

  const { name, email, password, gender, role } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/user/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, gender, role }),
    })

    const data = await response.json()
    console.log(response)
    if (response.ok) {
      const token = data.data.access_token
      cookies().set({
        name: "token",
        secure: true,
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60,
      })
    } else if (response.status == 409) {
      return {
        errors: {},
        message: "Already",
      }
    } else {
      return {
        errors: {},
        message: "Failed",
      }
    }
  } catch (error) {
    return { errors: {}, message: `${error}` }
  }
  revalidatePath("/login")
  redirect("/login")
}
