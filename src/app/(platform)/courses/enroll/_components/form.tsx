"use client"

import { useEffect } from "react"
import { EnrollCourse } from "@/action/enrollment"
import { useFormState, useFormStatus } from "react-dom"

import { EnrollCourseSate } from "@/types/courses"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { Icons } from "@/components/icons"

export default function EnrollForm() {
  const initialState: EnrollCourseSate = {
    errors: {
      code: undefined,
    },
    message: "",
  }

  const [state, dispatch] = useFormState(EnrollCourse, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan saat registrasi",
        description: state?.message,
        action: <ToastAction altText="Coba Lagi">Coba Lagi</ToastAction>,
      })
    }
  }, [state.message, toast])

  return (
    <form action={dispatch}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="code" className={cn({ "text-destructive": state?.errors?.code })}>
            Kode
          </Label>
          <Input id="code" name="code" placeholder="kode kelas" required />
          {state?.errors?.code ? (
            <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-destructive">
              {state.errors?.code.map((error: string) => <p key={error}>{error}</p>)}
            </div>
          ) : null}
        </div>
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="mt-2 w-full" type="submit" disabled={pending}>
      {pending && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Mohon tunggu..." : "Login"}
    </Button>
  )
}
