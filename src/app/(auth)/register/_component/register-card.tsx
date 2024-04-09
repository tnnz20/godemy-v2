"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import FieldForm from "./field-form"
import RoleForm from "./role-options"

export default function RegisterCard() {
  const searchParams = useSearchParams()
  const step = searchParams.get("step") ?? "1"

  return (
    <Card className="mx-auto w-[350px] md:w-[400px]">
      <CardHeader className="flex items-center">
        <CardTitle>Register</CardTitle>
        <CardDescription className="text-center">Daftar sekarang untuk menikmati fitur Godemy.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 px-6 pb-3">{step === "1" ? <RoleForm /> : <FieldForm />}</CardContent>
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
