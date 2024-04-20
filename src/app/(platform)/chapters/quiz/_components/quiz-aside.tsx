"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { QuizContextValue, useQuiz } from "./quiz.provider"

export default function QuizAside() {
  const { currentQuestion, setCurrentQuestion, setCurrentClicked, questions } = useQuiz() as QuizContextValue

  const questionLength = questions.length

  const variantConditions = (idx: number) => {
    // TODO: add new condition based on cookies
    if (idx === currentQuestion) {
      return "secondary"
    }

    return "outline"
  }

  const handleNavigation = (idx: number) => {
    setCurrentQuestion(idx)
    setCurrentClicked(null)
  }

  return (
    <aside className="container flex flex-initial flex-col gap-4 border-b py-2 md:h-full md:border-l">
      <h3 className=" mt-5 w-full text-sm md:text-center md:text-base/6 lg:text-lg ">Navigasi Soal</h3>
      <p>{questions[currentQuestion].id}</p>
      {!!questionLength && (
        <div className="flex flex-wrap gap-3 md:items-center md:justify-center">
          {questions.map((_, idx) => (
            <div key={questions[idx].id} className={cn({ "w-16": questionLength >= 20 })}>
              <Button variant={variantConditions(idx)} onClick={() => handleNavigation(idx)}>
                {idx + 1}
              </Button>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
