"use client"

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

import { QuestionItem } from "@/types/quiz"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

import { useQuizStore } from "../_provider/quiz.provider"
import AlertSubmitDialog from "./alert-submit-dialog"

export default function QuizPager() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const params = useParams()

  const questions = useQuizStore((state) => state.questions)

  const questionParams = searchParams.get("question")
  const currentQuestion = parseInt(questionParams as string) - 1 || 0
  const { prev, next } = QuestionPager(currentQuestion, questions)

  const handlePager = (idx: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("question", (idx + 1).toString())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={cn("flex max-w-screen-xl items-center justify-between", { "justify-end": prev === null })}>
      {prev !== null ? (
        <Button variant={"ghost"} className={cn("flex items-center gap-2 px-4")} onClick={() => handlePager(prev)}>
          <Icons.ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous question</span>
          <p>Kembali</p>
        </Button>
      ) : null}

      {next ? (
        <Button variant={"ghost"} className={cn("flex items-center gap-2 px-4")} onClick={() => handlePager(next)}>
          <p>Selanjutnya</p>
          <Icons.ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next question</span>
        </Button>
      ) : (
        <AlertSubmitDialog paramId={params?.id as string}>
          <Button variant={"destructive"}>Selesai</Button>
          <span className="sr-only">Submit question</span>
        </AlertSubmitDialog>
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
