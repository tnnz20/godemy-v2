"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

import { Input } from "@/components/ui/input"

import { Icons } from "@/components/icons"

export default function SearchClass() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if (term) {
      params.set("course_name", term)
    } else {
      params.delete("course_name")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Icons.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        defaultValue={searchParams.get("name")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  )
}
