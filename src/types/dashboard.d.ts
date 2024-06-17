import { Icons } from "next/dist/lib/metadata/types/metadata-types"

export type Role = "student" | "teacher"

export type NavItemDashboard = {
  name: string
  href: string
  icon: SVGElement | ForwardRefExoticComponent<LucideProps>
}

export type ProfileData = {
  title: string | undefined
  value: string | undefined
}
