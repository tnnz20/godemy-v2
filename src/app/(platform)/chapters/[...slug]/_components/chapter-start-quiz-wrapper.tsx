import { Suspense } from "react"
import { cookies } from "next/headers"

import { ChapterStartQuizButton } from "./chapter-start-quiz-button"

export async function ChapterStartQuizWrapper() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  return (
    <Suspense fallback={<p>Load button</p>}>
      <ChapterStartQuizButton token={token} />
    </Suspense>
  )
}
