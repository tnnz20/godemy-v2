import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import LoginForm from "./login-form"

export default function LoginCard() {
  return (
    <Card className="mx-auto w-[350px] md:w-[400px]">
      <CardHeader className="flex items-center">
        <CardTitle>Masuk</CardTitle>
        <CardDescription className="text-center">Masukan email dan password yang sudah terdaftar</CardDescription>
      </CardHeader>
      <CardContent className="relative overflow-hidden p-0 px-6">
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <CardDescription>
          Belum punya akun?{" "}
          <span className="hover:text-foreground hover:underline hover:underline-offset-4">
            <Button variant="link" className="p-0 text-accent-foreground" asChild>
              <Link href={"/register"}>Daftar sekarang</Link>
            </Button>
          </span>
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
