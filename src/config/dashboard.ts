import { NavItemDashboard } from "@/types/dashboard"

import { Icons } from "@/components/icons"

export const NavTeacherDashboard: NavItemDashboard[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.Home,
  },
  {
    name: "Kelas",
    href: "/dashboard/kelas",
    icon: Icons.Archive,
  },
  {
    name: "Siswa",
    href: "/dashboard/siswa",
    icon: Icons.BookUser,
  },
  {
    name: "Nilai",
    href: "/dashboard/nilai",
    icon: Icons.BookText,
  },
]

export const NavStudentDashboard: NavItemDashboard[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Icons.Home,
  },
]
