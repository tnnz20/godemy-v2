import React, { Suspense } from "react"

import RegisterCard from "./_component/register-card"

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-full items-center justify-center">
      <Suspense>
        <RegisterCard />
      </Suspense>
    </div>
  )
}
