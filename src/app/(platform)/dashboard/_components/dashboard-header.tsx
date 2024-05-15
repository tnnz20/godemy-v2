import { Role } from "@/types/dashboard"

import BreadcrumbHeader from "./breadcrumb-header"
import DashboardMobileNav from "./dashboard-mobile-nav"

interface DashboardHeaderProps {
  role: Role
}

export default function DashboardHeader({ role }: Readonly<DashboardHeaderProps>) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <DashboardMobileNav role={role} />
      <BreadcrumbHeader />
    </header>
  )
}
