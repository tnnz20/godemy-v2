"use client"

import { useEffect } from "react"
import { CreateCourse } from "@/action/courses"
import { ErrInternalServer, ErrValidation } from "@/constants/constants"
import { useFormState, useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { Icons } from "@/components/icons"

export default function DialogAddCourse() {
  const initialState = {
    errors: {
      course_name: undefined,
    },
    message: "",
  }

  const [state, dispatch] = useFormState(CreateCourse, initialState)

  const { toast } = useToast()
  const { pending } = useFormStatus()

  useEffect(() => {
    if (state?.message) {
      let errMsg: string
      let isError: boolean = false
      switch (state?.message) {
        case ErrValidation:
          errMsg = "Kesalahan dalam input data"
          isError = true
          break
        case ErrInternalServer:
          errMsg = "Terjadi kesalahan pada server"
          isError = true
          break
        default:
          errMsg = state?.message
          break
      }

      if (isError) {
        toast({
          variant: "destructive",
          title: "Terjadi kesalahan saat registrasi",
          description: errMsg,
        })
      } else {
        toast({
          variant: "success",
          title: "Berhasil membuat kelas",
          description: errMsg,
        })
      }
    }
  }, [state.message, toast])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <Icons.PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Tambah Kelas</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Kelas</DialogTitle>
          <DialogDescription>Tambahkan kelas baru untuk dipublikasikan.</DialogDescription>
        </DialogHeader>
        <form action={dispatch}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course_name" className="text-right">
                Nama Kelas
              </Label>
              <Input id="course_name" name="course_name" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {pending ? "Mohon tunggu..." : "Buat Kelas"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
