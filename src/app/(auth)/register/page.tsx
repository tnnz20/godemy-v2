import React, { Suspense } from "react"

import RegisterCard from "./_components/register-card"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Register",
  description: "Register page to register new account godemy",
}


export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterCard />
    </Suspense>
  )
}
