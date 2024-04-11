"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { signUp } from "@/action/register"
import { useFormState } from "react-dom"

import { RegisterState } from "@/types/register"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Icons } from "@/components/icons"

export default function FieldForm() {
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

  const [state, dispatch] = useFormState(signUp, initialState)

  return (
    <form className="px-2" action={dispatch}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" className={cn({ "text-destructive": state?.errors?.email })}>
            Email
          </Label>
          <Input id="email" name="email" placeholder="godemy@example.com" required />
          {state?.errors?.email ? (
            <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-destructive">
              {state.errors?.email.map((error: string) => <p key={error}>{error}</p>)}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name" className={cn({ "text-destructive": state?.errors?.name })}>
            Nama Lengkap
          </Label>
          <Input id="name" name="name" placeholder="Nama Lengkap" required />
          {state?.errors?.name ? (
            <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-destructive">
              {state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password" className={cn({ "text-destructive": state?.errors?.password })}>
            Password
          </Label>
          <Input id="password" name="password" placeholder="Password email anda" type="password" required />
          {state?.errors?.password ? (
            <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-destructive">
              {state.errors?.password.map((error: string) => <p key={error}>{error}</p>)}
            </div>
          ) : null}
        </div>
        <Input id="role" name="role" className="hidden" value={role} readOnly />
      </div>
      <div className="mb-4 mt-8">
        <ButtonForm />
      </div>
    </form>
  )
}

function ButtonForm() {
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
      <Button type="button" className="flex gap-2 px-3" variant={"ghost"} onClick={() => handleBack()}>
        <Icons.ArrowLeft className="h-4 w-4" />
        <p>Kembali</p>
      </Button>
      <Button type="submit">Daftar</Button>
    </div>
  )
}
