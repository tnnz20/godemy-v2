import { NavLinkDashboard } from "@/types/dashboard"

import { Icons } from "@/components/icons"

export const NavTeacherDashboard: NavLinkDashboard[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.Home,
  },
  {
    name: "Daftar Siswa",
    href: "/dashboard/daftar-siswa",
    icon: Icons.BookUser,
  },
  {
    name: "Daftar Kelas",
    href: "/dashboard/daftar-kelas",
    icon: Icons.Archive,
  },
]

export const NavStudentDashboard: NavLinkDashboard[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.Home,
  },
  {
    name: "Kelas",
    href: "/dashboard/kelas",
    icon: Icons.BookText,
  },
]
