"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

export default function CompilerHeader() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  return (
    <header className="border-b p-2">
      <Button variant={"ghost"} className="flex gap-2" onClick={() => handleBack()}>
        <Icons.ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Navigation Back</span>
        <h2 className="hidden md:block">Kembali</h2>
      </Button>
    </header>
  )
}
