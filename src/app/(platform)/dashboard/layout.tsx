import { Metadata } from "next"
import { cookies } from "next/headers"

import { DecodeJWT } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

import DashboardHeader from "./_components/dashboard-header"
import DashboardSideNav from "./_components/dashboard-sidenav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s | Dashboard`,
  },
  description: "Dashboard Page for Godemy Learning",
}

export default function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
  const cookieStore = cookies()
  const jwtToken = cookieStore.get("token")

  const { role } = DecodeJWT(jwtToken?.value)

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardSideNav role={role} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader role={role} />
        {children}
      </div>
      <Toaster />
    </div>
  )
}
