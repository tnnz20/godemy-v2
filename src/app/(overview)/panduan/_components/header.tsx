import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

export default function InstructionsHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-2 md:px-4">
        <nav>
          <Button variant={"ghost"} asChild>
            <Link href="/" className="flex flex-row items-center" aria-label="Beranda">
              <div className="flex items-center justify-between gap-2">
                <Icons.ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Home Navigation</span>
                <p className="md:text-sm md:font-medium">Kembali</p>
              </div>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
