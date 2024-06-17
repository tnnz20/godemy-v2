import { cookies } from "next/headers"

import { GetUsersProfile } from "@/lib/data/users/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import ProfilesForm from "./_components/form"

export default async function ProfilesPage() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  const userProfile = await GetUsersProfile(token as string)

  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfilesForm profiles={userProfile} />
        </CardContent>
      </Card>
    </div>
  )
}
