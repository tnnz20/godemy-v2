import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

interface LayoutProps {
  children: React.ReactNode
}

export default function LayoutAuth({ children }: Readonly<LayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderLayout />
      <div className="container flex w-full flex-grow items-center justify-center">{children}</div>
    </div>
  )
}

function HeaderLayout() {
  return (
    <header className="mx-4 mb-auto mt-2">
      <Button variant={"ghost"} asChild>
        <Link href="/" className="flex gap-1">
          <Icons.ChevronLeft />
          <h2>Home</h2>
        </Link>
      </Button>
    </header>
  )
}
