import { Metadata } from "next"

import { Role } from "@/types/dashboard"

import DashboardHeader from "./_components/dashboard-header"
import DashboardSideNav from "./_components/dashboard-sidenav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s | "Dashboard"`,
  },
  description: "Dashboard Page for Godemy Learning",
}

export default function DocsLayout({ children }: Readonly<DocsLayoutProps>) {
  const role: Role = "teacher"
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardSideNav role={role} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader role={role} />
        {children}
      </div>
    </div>
  )
}
