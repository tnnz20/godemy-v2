import { cookies } from "next/headers"
import Link from "next/link"

import { ProfileData } from "@/types/dashboard"
import { GetUsersProfile } from "@/lib/data/users/profile"
import { DecodeJWT } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Icons } from "@/components/icons"

export default async function DashboardProfile() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value
  const { role } = DecodeJWT(token)

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "0001-01-01T00:00:00Z") {
      return "-"
    }
    return new Date(dateString).toLocaleDateString()
  }

  const users = await GetUsersProfile(token as string)

  const Profile: ProfileData[] = [
    {
      title: "Nama",
      value: users?.data?.name,
    },
    {
      title: "Email",
      value: users?.data?.email,
    },
    {
      title: "Jenis Kelamin",
      value: users?.data?.gender === "male" ? "Laki-laki" : "Perempuan",
    },
    {
      title: "Role",
      value: role === "student" ? "Siswa" : "Guru",
    },
    {
      title: "Tanggal Lahir",
      value: formatDate(users?.data?.date as string),
    },
  ]

  const monthNames: { [key: string]: string } = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  }

  const updatedDate = String(users?.data?.updated_at)
  const [year, month, day] = updatedDate.split("T")[0].split("-")

  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-02-chunk-0">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">Profile</CardTitle>
            <CardDescription>Biodata pengguna</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/settings/profiles"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Icons.SquarePen className="h-5 w-5" />
                    <span className="sr-only">Edit Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left">Edit Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          {Profile.map((item, index) => (
            <div key={item?.title} className="grid gap-3">
              <div className="font-semibold">{item.title}</div>
              <p className="text-muted-foreground">{item.value === "" ? "-" : item.value}</p>
              {index < Profile.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated{" "}
            <time dateTime="2023-11-23">
              {monthNames[month]} {day}, {year}
            </time>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
