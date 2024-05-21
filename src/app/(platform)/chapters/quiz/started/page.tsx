import { Suspense } from "react"

import { AlertStarted } from "./_components/AlertDialog"

export default function StartingPointPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AlertStarted />
    </Suspense>
  )
}
