import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Icons } from "@/components/icons"

export default function SettingsNav() {
  return (
    <>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Button variant={"ghost"} asChild>
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
            <Icons.ChevronLeft />
            <p>Kembali</p>
            <span className="sr-only">Navigation to dashboard</span>
          </Link>
        </Button>
      </nav>
      <MobileNav />
    </>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Icons.Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
            <p>Go</p>
            <span className="sr-only">Godemy Inc</span>
          </Link>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <Link href="#" aria-disabled className="hover:text-foreground">
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
