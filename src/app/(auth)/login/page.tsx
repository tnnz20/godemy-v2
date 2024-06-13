import { Metadata } from "next"
import Image from "next/image"

import LoginCard from "./_components/card"

export const metadata: Metadata = {
  title: "Login",
  description: "Login page to login account godemy",
}

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[100px] lg:grid-cols-2 xl:min-h-[200px]">
      <LoginCard />
      <div className="hidden bg-muted lg:block">
        <Image
          src="/static/growth.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-auto object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
