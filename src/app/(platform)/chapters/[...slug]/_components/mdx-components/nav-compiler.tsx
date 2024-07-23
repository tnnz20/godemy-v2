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
      <Button asChild>
        <Link href={`/compiler/${params}`} className="flex gap-2">
          <span className="sr-only">Navigation to compiler</span>
          <h2 className="hidden md:block">Coba Sekarang</h2>
          <Icons.ChevronsRight className="h-4 w-4" />
        </Link>
      </Button>
    </nav>
  )
}
