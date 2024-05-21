import { cookies } from "next/headers"

import { ChapterStartQuizButton } from "./chapter-start-quiz-button"

export function ChapterStartQuizWrapper() {
  const cookiesStore = cookies()
  const TOKEN = cookiesStore.get("token")?.value

  return <ChapterStartQuizButton token={TOKEN} />
}
