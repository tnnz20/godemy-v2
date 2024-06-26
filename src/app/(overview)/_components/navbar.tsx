import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b  px-4 shadow-sm ">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Link href="/" className="hidden md:block">
          <p className="font-logo text-xl font-medium tracking-wider transition hover:opacity-75 ">
            <span className="mr-1 border-2 border-slate-600 px-[2px]">Go</span>demy
          </p>
        </Link>
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button asChild>
            <Link href="/login">Masuk</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
