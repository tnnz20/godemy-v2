"use client"

import { useEffect, useState } from "react"
import { UpdateUsers } from "@/action/users"
import { ErrValidation } from "@/constants/constants"
import { format } from "date-fns"
import { useFormState, useFormStatus } from "react-dom"

import { UsersProfile } from "@/types/api"
import { UsersState } from "@/types/auth"
import { cn, convertUnixToDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { Icons } from "@/components/icons"

interface ProfilesFormProps {
  profiles: UsersProfile
}

const initialState: UsersState = {
  errors: {
    name: undefined,
    gender: undefined,
    address: undefined,
  },
  message: "",
}

export default function ProfilesForm({ profiles }: Readonly<ProfilesFormProps>) {
  const usersGender = profiles?.data?.gender ?? ""

  const usersDate = profiles?.data?.date
  const validDate = usersDate === 0 ? undefined : convertUnixToDate(usersDate as number)

  const [date, setDate] = useState<Date | undefined>(validDate)
  const [gender, setGender] = useState<string>(usersGender)
  const [name, setName] = useState<string>(profiles?.data?.name ?? "")
  const [address, setAddress] = useState<string>(profiles?.data?.address ?? "")
  const [success, setSuccess] = useState<boolean | undefined>(undefined)
  const [message, setMessage] = useState<string>("")
  const [state, dispatch] = useFormState(UpdateUsers, initialState as any)

  const formattedDate: number = date ? date.getTime() : 0
  const { toast } = useToast()

  useEffect(() => {
    if (state?.message) {
      if (state.message === ErrValidation) {
        setMessage("Kesalahan dalam input data")
        setSuccess(false)
      } else {
        setMessage(state.message)
        setSuccess(false)
      }
    } else {
      setSuccess(true)
    }
  }, [state, message])

  useEffect(() => {
    if (success === false) {
      toast({
        variant: "destructive",
        title: "Terjadi kesalahan",
        description: message,
        action: <ToastAction altText="Coba Lagi">Coba Lagi</ToastAction>,
      })
    } else if (success === true) {
      toast({
        variant: "success",
        title: "Berhasil menyimpan perubahan",
        description: "Data berhasil diubah",
      })
    }

    setSuccess(undefined)
  }, [success, message, toast])

  return (
    <form action={dispatch}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className={cn({ "text-destructive": state?.errors?.name })}>
            Nama Lengkap
          </Label>
          <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          {state?.errors?.name ? (
            <div id="users-error" aria-live="polite" className="mt-1 text-sm text-destructive">
              {state.errors?.name.map((error: string) => <p key={error}>{error}</p>)}
            </div>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={profiles?.data?.email} disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date" className={cn({ "text-destructive": state?.errors?.date })}>
            Tanggal Lahir
          </Label>
          <Input id="date" name="date" value={formattedDate} className="hidden" readOnly />
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <Icons.CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pilih Tanggal Lahir</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  captionLayout="dropdown-buttons"
                  fromYear={1950}
                  toYear={2024}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {state?.errors?.date ? (
              <div id="edit-error" aria-live="polite" className="text-sm text-destructive">
                {state.errors?.date.map((error: string) => <p key={error}>{error}</p>)}
              </div>
            ) : null}
          </div>
        </div>
        <div className=" grid gap-2">
          <Label htmlFor="gender" className={cn({ "text-destructive": state?.errors?.gender })}>
            Jenis Kelamin
          </Label>
          <Input id="gender" name="gender" value={gender} className="hidden" readOnly required />
          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-2">
              <Select onValueChange={setGender} value={gender} defaultValue={gender} required>
                <SelectTrigger id="gender" aria-label={gender}>
                  {gender !== "" ? (
                    <SelectValue>{gender === "male" ? "Laki-laki" : "Perempuan"}</SelectValue>
                  ) : (
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  )}
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="male">Laki-laki</SelectItem>
                  <SelectItem value="female">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {state?.errors?.gender ? (
              <div id="edit-error" aria-live="polite" className="col-span-3 flex items-center text-sm text-destructive">
                {state.errors?.gender.map((error: string) => <p key={error}>{error}</p>)}
              </div>
            ) : null}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address" className={cn({ "text-destructive": state?.errors?.address })}>
            Alamat
          </Label>
          <Input id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
          {state?.errors?.address ? (
            <div id="users-error" aria-live="polite" className="mt-1 text-sm text-destructive">
              {state.errors?.address.map((error: string) => <p key={error}>{error}</p>)}
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
    <div className="mt-8 flex w-full justify-end">
      <Button type="submit" disabled={pending}>
        {pending && <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {pending ? "Mohon tunggu..." : "Simpan Perubahan"}
      </Button>
    </div>
  )
}
