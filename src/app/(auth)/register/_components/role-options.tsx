"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"

import { Icons } from "@/components/icons"

interface RoleFormProps {
  step: string
}

export default function RoleForm({ step }: Readonly<RoleFormProps>) {
  const role = ["Siswa", "Guru"]

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleClick = (role: string) => {
    const params = new URLSearchParams(searchParams)
    if (role === "Guru") {
      params.set("role", "teacher")
    } else {
      params.delete("role")
    }
    params.set("step", "2")

    replace(`${pathname}?${params}`)
  }

  return (
    <div className={cn("flex w-full flex-col gap-4 pt-2", { hidden: step !== "1" })}>
      <CardDescription className="flex items-center justify-center text-muted-foreground">
        Pilih role untuk akun anda
      </CardDescription>
      <div className="flex justify-center gap-2">
        {role.map((item) => (
          <Button
            className="h-32 w-32 text-muted-foreground hover:text-foreground"
            variant={"outline"}
            onClick={() => handleClick(item)}
            key={item}
          >
            <div className="flex flex-col items-center gap-4 ">
              {item === "Siswa" && (
                <>
                  <Icons.User className="h-8 w-8" />
                  <span className="sr-only">Icon Student</span>
                </>
              )}
              {item === "Guru" && (
                <>
                  <Icons.GraduationCap className="h-8 w-8" />
                  <span className="sr-only">Icon Teacher</span>
                </>
              )}
              <p>{item}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
