import { QuestionItem } from "@/types/quiz"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

import { QuizContextValue, useQuiz } from "./quiz.provider"

// TODO: add submit quiz handler
export default function QuizPager() {
  const { currentQuestion, setCurrentQuestion, setCurrentClicked, questions } = useQuiz() as QuizContextValue
  const { prev, next } = QuestionPager(currentQuestion, questions)

  const handlePager = (idx: number) => {
    setCurrentQuestion(idx)
    setCurrentClicked(null)
  }

  return (
    <div className={cn("flex max-w-screen-xl items-center justify-between", { "justify-end": prev === null })}>
      {prev !== null ? (
        <Button variant={"ghost"} className={cn("flex items-center gap-2 px-4")} onClick={() => handlePager(prev)}>
          <Icons.ChevronLeft className="h-6 w-6" />
          <p>Kembali</p>
        </Button>
      ) : null}

      {next ? (
        <Button variant={"ghost"} className={cn("flex items-center gap-2 px-4")} onClick={() => handlePager(next)}>
          <p>Selanjutnya</p>
          <Icons.ChevronRight className="h-6 w-6" />
        </Button>
      ) : (
        <Button variant={"destructive"}>Akhiri</Button>
      )}
    </div>
  )
}

function QuestionPager(currentQuestion: number, question: QuestionItem[]) {
  const prev = currentQuestion > 0 ? currentQuestion - 1 : null
  const next = currentQuestion < question.length - 1 ? currentQuestion + 1 : null
  return {
    prev,
    next,
  }
}
