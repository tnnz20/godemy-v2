"use client"

import { useState } from "react"
import { UpdateUsers } from "@/action/users"
import { format } from "date-fns"
import { useFormState, useFormStatus } from "react-dom"

import { UsersProfile } from "@/types/api"
import { UsersState } from "@/types/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const [date, setDate] = useState<Date | undefined>()
  const [gender, setGender] = useState<string>(profiles?.data?.gender ?? "")
  const [name, setName] = useState<string>(profiles?.data?.name ?? "")
  const [address, setAddress] = useState<string>(profiles?.data?.address ?? "")

  const [state, dispatch] = useFormState(UpdateUsers, initialState as any)
  const formattedDate = date ? format(date, "yyyy/MM/dd") : ""

  const convertedGender = profiles?.data?.gender === "male" ? "Laki-laki" : "Perempuan"

  return (
    <form action={dispatch}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={profiles?.data?.email} disabled />
        </div>
        <div className="grid w-1/4 gap-2">
          <Label htmlFor="date">Tanggal Lahir</Label>
          <Input id="date" name="date" value={formattedDate} className="hidden" readOnly />
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
                fromYear={1980}
                toYear={2024}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid w-1/4 gap-2">
          <Label htmlFor="gender">Jenis Kelamin</Label>
          <Input id="gender" name="gender" value={gender} className="hidden" readOnly />
          <Select onValueChange={setGender} value={gender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder={profiles?.data?.gender ? convertedGender : "Pilih Jenis Kelamin"} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Alamat</Label>
          <Input id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
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
