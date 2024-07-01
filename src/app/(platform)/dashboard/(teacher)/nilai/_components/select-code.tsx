"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectCode() {
  const codeMap = {
    1: "Chapter 1",
    2: "Chapter 2",
    3: "Chapter 3",
    4: "Chapter 4",
    5: "Chapter 5",
    6: "Chapter 6",
    7: "Evaluasi",
  }

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("code", value)
    } else {
      params.delete("courseId")
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const code = searchParams.get("code")?.toString() ?? ""

  return (
    <Select onValueChange={handleChange} defaultValue={code}>
      <SelectTrigger className="w-[240px]" aria-label="Select courses">
        <SelectValue placeholder="Pilih Chapter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pilih Chapter</SelectLabel>
          {Object.entries(codeMap).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
