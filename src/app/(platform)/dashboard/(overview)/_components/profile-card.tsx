import { cookies } from "next/headers"
import Link from "next/link"
import { format } from "date-fns"

import { UsersProfileData } from "@/types/api"
import { GetUsersProfile } from "@/lib/data/users/profile"
import { convertUnixToDate, DecodeJWT } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Icons } from "@/components/icons"

import ProfileContent from "./profile-card-content"

export default async function DashboardProfile() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value
  const { role } = DecodeJWT(token)

  const users = await GetUsersProfile(token as string)

  const updatedDate = convertUnixToDate(users?.data?.updated_at as number)
  const formattedUpdatedDate = format(updatedDate, "PPP")

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
          <ProfileContent users={users?.data as UsersProfileData} role={role} />
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time>{formattedUpdatedDate}</time>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
