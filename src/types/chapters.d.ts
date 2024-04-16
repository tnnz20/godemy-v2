export type ChapterSubNavItem = {
  title: string
  href?: string
  threshold?: number
  disabled?: boolean
}

export type ChaptersNavItem = {
  title: string
  disabled?: boolean
  href?: string
  items: ChapterSubNavItem[]
}

export type ChaptersConfig = {
  NavItems: ChaptersNavItem[]
}
