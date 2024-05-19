"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { useQuizStore } from "../_provider/quiz.provider"
import AlertSubmitDialog from "./alert-submit-dialog"

export default function QuizAside() {
  const { answered, questions } = useQuizStore((state) => ({
    answered: state.answered,
    questions: state.questions,
  }))

  const questionLength = questions.length

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const questionParams = searchParams.get("question")
  const currentQuestion = parseInt(questionParams as string) - 1 || 0

  const variantConditions = (idx: number) => {
    if (idx === currentQuestion) {
      return "secondary"
    }

    const AnsweredId = Object.keys(answered).map((key) => parseInt(key))
    if (AnsweredId.includes(questions[idx].id)) {
      return "default"
    }

    return "outline"
  }

  const handleNavigation = (idx: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("question", (idx + 1).toString())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <aside className="container flex w-1/3 flex-col gap-4 border-b py-2 md:h-screen md:flex-1 md:border-l">
      <h3 className="mt-5 w-full text-sm md:text-center md:text-base/6 lg:text-lg ">Navigasi Soal</h3>
      <div className="flex flex-col gap-10">
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
        <AlertSubmitDialog />
      </div>
    </aside>
  )
}
