"use client"

import { useEffect } from "react"
import { Login } from "@/action/auth"
import { ErrInternalServer, ErrInvalid, ErrUserNotFound, ErrValidation, ErrWrongPassword } from "@/constants/constants"
import { useFormState, useFormStatus } from "react-dom"

import { LoginState } from "@/types/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { Icons } from "@/components/icons"

export default function LoginForm() {
  const initialState: LoginState = {
    errors: {
      email: undefined,
      password: undefined,
    },
    message: "",
  }

  const [state, dispatch] = useFormState(Login, initialState)

  const { toast } = useToast()
  const { pending } = useFormStatus()

  useEffect(() => {
    if (state.message) {
      let errMsg: string
      switch (state.message) {
        case ErrValidation:
          errMsg = "Kesalahan dalam input data"
          break
        case ErrUserNotFound:
          errMsg = "User tidak ditemukan"
          break
        case ErrWrongPassword:
          errMsg = "Password yang dimasukan salah"
          break
        case ErrInvalid:
          errMsg = "Email atau password tidak valid"
          break
        case ErrInternalServer:
          errMsg = "Terjadi kesalahan pada server"
          break
        default:
          errMsg = state.message
          break
      }
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan saat login",
        description: errMsg,
        action: <ToastAction altText="Coba Lagi">Coba Lagi</ToastAction>,
      })
    }
  }, [state.message, toast])

  return (
    <form action={dispatch}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className={cn({ "text-destructive": state?.errors?.email })}>
            Email
          </Label>
          <Input id="email" name="email" placeholder="godemy@example.com" required />
          {state?.errors?.email ? (
            <div id="users-error" aria-live="polite" className="mt-2 text-sm text-destructive">
              {state.errors?.email.map((error: string) => <p key={error}>{error}</p>)}
            </div>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className={cn({ "text-destructive": state?.errors?.password })}>
            Password
          </Label>
          <Input id="password" name="password" placeholder="password email anda" type="password" required />
          {state?.errors?.password ? (
            <div id="users-error" aria-live="polite" className="mt-2 text-sm text-destructive">
              {state.errors?.password.map((error: string) => <p key={error}>{error}</p>)}
            </div>
          ) : null}
        </div>
        <Button className="w-full" type="submit" disabled={pending}>
          {pending && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {pending ? "Mohon tunggu..." : "Login"}
        </Button>
      </div>
    </form>
  )
}
