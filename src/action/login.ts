"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "@/constants/constants"
import { AuthSchema } from "@/validators/authSchema"

import { LoginState } from "@/types/login"

export async function SignIn(prevState: LoginState, formData: FormData) {
  const LoginSchema = AuthSchema.omit({ name: true, role: true })

  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  // TODO: add constant for error message
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validations",
    }
  }

  const { email, password } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      const token = data.data.access_token
      cookies().set({
        name: "token",
        secure: true,
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 24 * 60 * 60 * 2, // 2 days
      })
    } else if (response.status == 500) {
      return {
        errors: {},
        message: "Invalid",
      }
    } else {
      return {
        errors: {},
        message: "Failed",
      }
    }
  } catch (error) {
    console.error(error)
    return { message: `${error}` }
  }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}
