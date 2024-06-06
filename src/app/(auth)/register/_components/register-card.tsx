"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import RegisterForm from "./register-form"
import RoleForm from "./role-options"

export default function RegisterCard() {
  const searchParams = useSearchParams()
  const step = searchParams.get("step") ?? "1"

  return (
    <Card className="mx-auto w-[350px] md:w-[400px]">
      <CardHeader className="flex items-center">
        <CardTitle>Daftar akun Godemy</CardTitle>
        <CardDescription className="text-center">Daftar sekarang untuk menikmati fitur Godemy</CardDescription>
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
      <CardFooter className="flex justify-center">
        {step === "1" && (
          <CardDescription>
            Sudah punya akun?{" "}
            <span className="hover:text-foreground hover:underline hover:underline-offset-4">
              <Button variant="link" className="p-0 text-accent-foreground" asChild>
                <Link href={"/login"}>Masuk sekarang</Link>
              </Button>
            </span>
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  )
}
