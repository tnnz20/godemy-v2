"use client"

import { useEffect } from "react"
import { JoinClass } from "@/action/join-class"
import { useFormState, useFormStatus } from "react-dom"

import { ClassSate } from "@/types/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function ClassForm() {
  const initialState: ClassSate = {
    errors: {
      code: undefined,
    },
    message: "",
  }

  const [state, dispatch] = useFormState(JoinClass, initialState)
  const { toast } = useToast()
  const { pending } = useFormStatus()

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan saat registrasi",
        description: state?.message,
      })
    }
  }, [state.message, toast])

  return (
    <form className="px-2" action={dispatch}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="code" className={cn({ "text-destructive": state?.errors?.code })}>
            Kode Kelas
          </Label>
          <Input id="code" name="code" placeholder="kode kelas" required />
          {state?.errors?.code ? (
            <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-destructive">
              {state.errors?.code.map((error: string) => <p key={error}>{error}</p>)}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mb-4 mt-8">
        <ButtonForm pending={pending} />
      </div>
    </form>
  )
}

function ButtonForm({ pending }: Readonly<{ pending: boolean }>) {
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Mohon tunggu..." : "Masuk"}
    </Button>
  )
}
