"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  BASE_URL,
  ErrConflict,
  ErrInternalServer,
  ErrInvalid,
  ErrUserNotFound,
  ErrValidation,
  ErrWrongPassword,
} from "@/constants/constants"
import { AuthSchema } from "@/validators/authSchema"

import { LoginState, RegisterState } from "@/types/auth"

export async function Login(prevState: LoginState, formData: FormData) {
  const LoginSchema = AuthSchema.omit({ name: true, role: true })

  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: ErrValidation,
    }
  }

  const { email, password } = validateFields.data

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      const token = data.data.token
      cookies().set({
        name: "token",
        secure: true,
        value: token,
        httpOnly: true,
        path: "/",
        // maxAge: 24 * 60 * 60 * 2, // 2 days
      })
    } else if (response.status === 400) {
      if (data?.error?.error_description == "wrong password") {
        revalidatePath("/login")
        return { message: ErrWrongPassword }
      } else {
        revalidatePath("/login")
        return { message: ErrInvalid }
      }
    } else if (response.status === 404) {
      revalidatePath("/login")
      return { message: ErrUserNotFound }
    } else {
      revalidatePath("/login")
      return { message: ErrInternalServer }
    }
  } catch (error) {
    console.error(error)
    return { message: `${error}` }
  }
  revalidatePath("/dashboard")
  redirect("/dashboard")
}

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
      let msg: string
      if (response.status == 409) {
        msg = ErrConflict
      } else {
        msg = ErrInternalServer
      }
      revalidatePath("/register")
      return { message: msg }
    }
  } catch (error) {
    return { message: `${error}` }
  }

  revalidatePath("/login")
  redirect("/login")
}
