import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: "Auth",
    template: `%s | Auth`,
  },
  description: "Authentication Layout",
}

export default function AuthLayout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderLayout />
      {children}
    </div>
  )
}

function HeaderLayout() {
  return (
    <header className="mb-auto mt-2 md:mx-4">
      <Button variant={"ghost"} asChild>
        <Link href="/" className="flex gap-1">
          <Icons.ChevronLeft />
          <span className="sr-only">Navigation Home</span>
          <h2 className="hidden md:block">Beranda</h2>
        </Link>
      </Button>
    </header>
  )
}
