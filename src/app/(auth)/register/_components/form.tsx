"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Register } from "@/action/auth"
import { ErrConflict, ErrInternalServer, ErrValidation } from "@/constants/constants"
import { useFormState, useFormStatus } from "react-dom"

import { RegisterState } from "@/types/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { Icons } from "@/components/icons"

export default function RegisterForm() {
  const searchParams = useSearchParams()

  const role = searchParams.get("role") ?? "student"

  const initialState: RegisterState = {
    errors: {
      email: undefined,
      password: undefined,
      name: undefined,
      role: undefined,
    },
    message: "",
  }

  const [state, dispatch] = useFormState(Register, initialState)

  const { toast } = useToast()
  const { pending } = useFormStatus()

  useEffect(() => {
    if (state?.message) {
      let errMsg: string
      switch (state?.message) {
        case ErrValidation:
          errMsg = "Kesalahan dalam input data"
          break
        case ErrConflict:
          errMsg = "Email sudah terdaftar"
          break
        case ErrInternalServer:
          errMsg = "Terjadi kesalahan pada server"
          break
        default:
          errMsg = state?.message
          break
      }
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan saat registrasi",
        description: errMsg,
        action: <ToastAction altText="Coba Lagi">Coba Lagi</ToastAction>,
      })
    }
  }, [state.message, toast])

  return (
    <form action={dispatch}>
      <div className="grid  gap-4">
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
          <Label htmlFor="name" className={cn({ "text-destructive": state?.errors?.name })}>
            Nama
          </Label>
          <Input id="name" name="name" placeholder="nama lengkap" required />
          {state?.errors?.name ? (
            <div id="users-error" aria-live="polite" className="mt-2 text-sm text-destructive">
              {state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
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
        <Input id="role" name="role" className="hidden" value={role} readOnly />
      </div>
      <div className="mt-8">
        <ButtonForm pending={pending} />
      </div>
    </form>
  )
}

function ButtonForm({ pending }: Readonly<{ pending: boolean }>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { replace } = useRouter()

  const handleBack = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("role")
    params.delete("step")
    replace(`${pathname}?${params}`)
  }

  return (
    <div className="flex justify-between">
      {pending ? null : (
        <Button type="button" className="flex gap-2 px-3" variant={"ghost"} onClick={() => handleBack()}>
          <Icons.ArrowLeft className="h-4 w-4" />
          <p>Kembali</p>
        </Button>
      )}
      <Button disabled={pending} className={cn({ "w-full": pending })} type="submit">
        {pending && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {pending ? "Mohon tunggu..." : "Daftar"}
      </Button>
    </div>
  )
}
