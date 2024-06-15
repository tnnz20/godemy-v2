"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "@/components/icons"

export default function Filter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const initialStatus = searchParams.get("status") ?? ""
  const initialSort = searchParams.get("sort") ?? "ASC"

  const [status, setStatus] = useState(initialStatus)
  const [sort, setSort] = useState(initialSort)

  const handleClick = (filterType: string) => {
    const params = new URLSearchParams(searchParams)

    if (filterType === "status") {
      const newStatus = status ? "" : "1"
      setStatus(newStatus)
      if (newStatus) {
        params.set("status", newStatus)
      } else {
        params.delete("status")
      }
    }

    if (filterType === "sort") {
      const newSort = sort === "ASC" ? "DESC" : "ASC"
      setSort(newSort)
      if (newSort === "ASC") {
        params.delete("sort")
      } else {
        params.set("sort", newSort)
      }
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Icons.ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter berdasarkan</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={status === "1"} onClick={() => handleClick("status")}>
          Lulus
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={sort === "DESC"} onClick={() => handleClick("sort")}>
          Tanggal Pelaksanaan
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
