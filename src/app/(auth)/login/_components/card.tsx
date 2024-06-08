import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import LoginForm from "./form"

export default function LoginCard() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Masukan email dan password yang sudah terdaftar untuk masuk ke akun anda</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <CardDescription>
          Belum punya akun?{" "}
          <span className="hover:text-foreground hover:underline hover:underline-offset-4">
            <Button variant="link" className="p-0 text-accent-foreground" asChild>
              <Link href={"/register"}>Daftar sekarang</Link>
            </Button>
            <span className="sr-only">Button Register Page</span>
          </span>
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
