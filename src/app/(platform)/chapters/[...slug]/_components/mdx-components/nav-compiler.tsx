import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

interface CompilerProps {
  src: string
}

export function NavCompiler({ src }: Readonly<CompilerProps>) {
  const params = src.split("/")[4]

  return (
    <nav className="mt-2">
      <Link href={`/compiler/${params}`}>
        <Button className="flex gap-2">
          <span className="sr-only">Navigation to compiler</span>
          <h2 className="hidden md:block">Coba Sekarang</h2>
          <Icons.ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </nav>
  )
}
