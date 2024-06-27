"use client"

import { format } from "date-fns"

import { UsersProfileData } from "@/types/api"
import { ProfileData } from "@/types/dashboard"
import { convertUnixToDate } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

type ProfileContentProps = {
  users: UsersProfileData
  role: string
}

export default function ProfileContent({ users, role }: Readonly<ProfileContentProps>) {
  const gender = users.gender ?? ""
  const date = users.date

  const convertedDate = convertUnixToDate(date)
  const formattedDate = date === 0 ? "-" : format(convertedDate, "dd MMMM yyyy")
  const formattedGender = gender === "male" ? "Laki-laki" : "Perempuan"

  const Profile: ProfileData[] = [
    {
      title: "Nama",
      value: users.name,
    },
    {
      title: "Email",
      value: users.email,
    },
    {
      title: "Jenis Kelamin",
      value: gender === "" ? "-" : formattedGender,
    },
    {
      title: "Role",
      value: role === "student" ? "Siswa" : "Guru",
    },
    {
      title: "Tanggal Lahir",
      value: String(formattedDate),
    },
  ]
  return (
    <>
      {Profile.map((item, index) => (
        <div key={item?.title} className="grid gap-3">
          <div className="font-semibold">{item.title}</div>
          <p className="text-muted-foreground">{item.value === "" ? "-" : item.value}</p>
          {index < Profile.length - 1 && <Separator className="my-2" />}
        </div>
      ))}
    </>
  )
}
