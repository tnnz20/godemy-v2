import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { Role } from "@/types/dashboard"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Icons } from "@/components/icons"

import SideNavItems from "./dashboard-sidenav-item"

interface DashboardSideNavProps {
  role: Role
}

export default function DashboardSideNav({ role }: Readonly<DashboardSideNavProps>) {
  const Logout = async () => {
    "use server"
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")
    if (token) {
      cookiesStore.delete("token")
      redirect("/")
    }
  }
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <SideNavItems role={role} />
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <form action={Logout}>
                <div className="flex  items-center justify-center rounded-lg text-muted-foreground  transition-colors hover:text-foreground ">
                  <button type="submit">
                    <Icons.Logout className="h-5 w-5" />
                    <span className="sr-only">Logout</span>
                  </button>
                </div>
              </form>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}
