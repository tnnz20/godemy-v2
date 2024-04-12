"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "@/constants/constants"
import { AuthSchema } from "@/validators/authSchema"

import { RegisterState } from "@/types/register"

export async function SignUp(prevState: RegisterState, formData: FormData) {
  const validateFields = AuthSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    gender: formData.get("gender"),
    role: formData.get("role"),
  })

  // TODO: add constant for error message
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validations",
    }
  }

  const { name, email, password, role } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/user/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    })

    const data = await response.json()

    // TODO: handle response when success to register/class
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
