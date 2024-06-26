import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Role } from "@/types/dashboard"
import { NavStudentDashboard, NavTeacherDashboard } from "@/config/dashboard"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Icons } from "@/components/icons"

type DashboardMobileNavProps = {
  role: Role
}

export default function DashboardMobileNav({ role }: Readonly<DashboardMobileNavProps>) {
  const navItems = role === "student" ? NavStudentDashboard : NavTeacherDashboard

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
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Icons.PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium ">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <p className="text-sm">Go</p>
            <span className="sr-only">Godemy Inc</span>
          </Link>
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
          <form action={Logout}>
            <button
              type="submit"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Icons.Logout className="h-5 w-5" />
              Logout
            </button>
          </form>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
