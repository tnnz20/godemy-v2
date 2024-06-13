"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import RegisterForm from "./form"
import RoleForm from "./role-options"

export default function RegisterCard() {
  const searchParams = useSearchParams()
  const step = searchParams.get("step") ?? "1"

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Daftar akun</CardTitle>
        <CardDescription>Masukan data anda untuk membuat akun Godemy</CardDescription>
      </CardHeader>
      <CardContent className="relative overflow-hidden p-0 px-6">
        <motion.div
          animate={{
            translateX: `-${(parseInt(step) - 1) * 100}%`,
          }}
          transition={{
            ease: "easeInOut",
          }}
        >
          <RoleForm step={step} />
        </motion.div>
        <motion.div
          className={cn("absolute left-0 right-0 top-0", { relative: step === "2" })}
          animate={{
            translateX: `${100 - (parseInt(step) - 1) * 100}%`,
          }}
          style={{
            translateX: `${100 - (parseInt(step) - 1) * 100}%`,
          }}
          transition={{
            ease: "easeInOut",
          }}
        >
          <RegisterForm />
        </motion.div>
      </CardContent>
      <CardFooter className="mt-2 flex justify-center">
        {step === "1" && (
          <CardDescription className="mt-4">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary underline">
              Masuk Sekarang
            </Link>
            <span className="sr-only">Button Login Page</span>
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  )
}
