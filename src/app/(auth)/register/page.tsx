import React, { Suspense } from "react"
import { Metadata } from "next"

import RegisterCard from "./_components/card"

export const metadata: Metadata = {
  title: "Register",
  description: "Register page to register new account godemy",
}

export default function RegisterPage() {
  return (
    <div className="container flex flex-grow items-center justify-center">
      <Suspense>
        <RegisterCard />
      </Suspense>
    </div>
  )
}
