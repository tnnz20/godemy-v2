import Link from "next/link"

import LoginForm from "./form"

export default function LoginCard() {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Media Pembelajaran Pemrograman Golang</h1>
          <p className="text-balance text-muted-foreground">
            Masukan email dan password yang sudah terdaftar untuk masuk ke akun anda
          </p>
        </div>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <Link href="/register" className="underline">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  )
}
