import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

import EnrollCard from "./_components/card"

export default function EnrollPage() {
  return (
    <div className="flex flex-col">
      <div className="ml-4 mt-2">
        <Button variant={"ghost"} className="mx-auto items-center">
          <Icons.ChevronLeft className="mr-2 h-4 w-4" />
          <Link href="/dashboard">Kembali</Link>
        </Button>
      </div>
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <EnrollCard />
      </div>
    </div>
  )
}
