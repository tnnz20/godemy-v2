import React from "react"

import { QuestionItem } from "@/types/quiz"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

import { QuizContextValue, useQuiz } from "./quiz.provider"

export default function QuizPager() {
  const { currentQuestion, setCurrentQuestion, questions } = useQuiz() as QuizContextValue
  const { prev, next } = QuestionPager(currentQuestion, questions)

  return (
    <div className={cn("flex max-w-screen-xl items-center justify-between", { "justify-end": prev === null })}>
      {prev !== null ? (
        <Button
          variant={"ghost"}
          className={cn("flex items-center gap-2 px-4")}
          onClick={() => setCurrentQuestion(prev)}
        >
          <Icons.ChevronLeft className="h-6 w-6" />
          <p>Kembali</p>
        </Button>
      ) : null}

      {next ? (
        <Button
          variant={"ghost"}
          className={cn("flex items-center gap-2 px-4")}
          onClick={() => setCurrentQuestion(next)}
        >
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
