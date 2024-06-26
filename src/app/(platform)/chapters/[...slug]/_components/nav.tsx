import Link from "next/link"

import { ChaptersConfig } from "@/types/chapters"
import { chaptersConfig } from "@/config/chapters"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

import ChapterMobileNavWrapper from "./mobile-nav-wrapper"

export default function ChapterNav() {
  const chapters: ChaptersConfig = chaptersConfig

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-2 md:px-4">
        <nav>
          <Button variant={"ghost"} asChild>
            <Link href="/dashboard" className="flex flex-row items-center" aria-label="Dashboard Link">
              <div className="flex items-center justify-between gap-2">
                <Icons.MoveLeft className="h-6 w-6" />
                <span className="sr-only">Dashboard Navigation</span>
                <p className="hidden md:block md:text-lg md:font-medium">Golang Fundamental</p>
              </div>
            </Link>
          </Button>
        </nav>
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <ChapterMobileNavWrapper chapters={chapters} />
        </div>
      </div>
    </header>
  )
}
