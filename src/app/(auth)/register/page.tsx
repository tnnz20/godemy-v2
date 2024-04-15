import React, { Suspense } from "react"

import RegisterCard from "./_components/register-card"

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterCard />
    </Suspense>
  )
}
