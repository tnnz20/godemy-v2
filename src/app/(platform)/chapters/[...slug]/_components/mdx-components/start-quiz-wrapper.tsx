import { Suspense } from "react"
import { cookies } from "next/headers"

import { Icons } from "@/components/icons"

import { ChapterStartQuizButton } from "./start-quiz-button"

interface ChapterStartQuizWrapperProps {
  paramsId: string
}

export async function ChapterStartQuizWrapper({ paramsId }: Readonly<ChapterStartQuizWrapperProps>) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  return (
    <Suspense fallback={<FallbackStartQuiz />}>
      <ChapterStartQuizButton token={token} paramsId={paramsId} />
    </Suspense>
  )
}

function FallbackStartQuiz() {
  return (
    <div className="item-center flex w-full justify-center text-muted-foreground">
      <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>Memuat informasi...</p>
    </div>
  )
}
