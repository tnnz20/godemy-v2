"use client"

import { SignIn } from "@/action/login"
import { useFormState } from "react-dom"

import { LoginState } from "@/types/login"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const initialState: LoginState = {
    errors: {
      email: undefined,
      password: undefined,
    },
    message: "",
  }

  const [state, dispatch] = useFormState(SignIn, initialState)

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
      </div>
      <div className="mb-4 mt-8">
        <ButtonForm />
      </div>
    </form>
  )
}

function ButtonForm() {
  return (
    <Button className="w-full" type="submit">
      Masuk
    </Button>
  )
}