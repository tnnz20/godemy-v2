import { Role } from "@/types/dashboard"

import SideNavItems from "./dashboard-sidenav-item"
import LogoutButton from "./logout-button"

interface DashboardSideNavProps {
  role: Role
}

export default function DashboardSideNav({ role }: Readonly<DashboardSideNavProps>) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <SideNavItems role={role} />
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <LogoutButton />
      </nav>
    </aside>
  )
}
