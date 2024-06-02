import { NavItemDashboard } from "@/types/dashboard"

import { Icons } from "@/components/icons"

export const NavTeacherDashboard: NavItemDashboard[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.Home,
  },
  {
    name: "Daftar Kelas",
    href: "/dashboard/daftar-kelas",
    icon: Icons.Archive,
  },
  {
    name: "Daftar Siswa",
    href: "/dashboard/daftar-siswa",
    icon: Icons.BookUser,
  },
]

export const NavStudentDashboard: NavItemDashboard[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.Home,
  },
]
