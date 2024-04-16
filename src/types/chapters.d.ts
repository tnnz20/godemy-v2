type NavItem = {
  title: string
  href: string
  threshold: number
}

export type ChaptersNavItem = {
  title: string
  disabled?: boolean
  href?: string
  items: NavItem[]
}

export type ChaptersConfig = {
  NavItems: ChaptersNavItem[]
}
