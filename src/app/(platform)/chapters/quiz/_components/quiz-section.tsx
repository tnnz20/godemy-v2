"use client"

import { useSearchParams } from "next/navigation"

import { cn, indexToAlphabet } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { useQuizStore } from "../_provider/quiz.provider"
import QuizPager from "./quiz-pager"

export default function QuizSection() {
  const { answered, setAnswered, questions } = useQuizStore((state) => ({
    answered: state.answered,
    setAnswered: state.setAnswered,
    questions: state.questions,
  }))

  const searchParams = useSearchParams()
  const questionParams = searchParams.get("question")
  const currentQuestion = parseInt(questionParams as string) - 1 || 0

  const question = questions[currentQuestion]

  const handleClickOption = (answer: string, questionId: number) => {
    setAnswered({ ...answered, [questionId]: answer })
  }

  const answeredOption = answered[question.id]

  return (
    <section className="container  w-2/3 md:ml-10 md:mt-10 md:flex-initial lg:mx-auto lg:ml-24">
      <div className={cn("flex flex-col justify-between", { "gap-36": !question?.isCode, "gap-32": question?.isCode })}>
        <div className="mt-5 flex flex-col gap-5">
          {!question?.isCode ? (
            <h2 className="text-sm md:text-base/6 lg:text-lg">{question?.question}</h2>
          ) : (
            <div className="mr-auto flex flex-col gap-2">
              <pre className="border p-8 text-sm md:text-base/6 lg:text-lg">{question?.question}</pre>
              <p>{question.subQuestion}</p>
            </div>
          )}
          <ul className="flex flex-col gap-4">
            {question.options.map((answer: string, idx) => (
              <li key={answer}>
                <Button
                  variant={"ghost"}
                  type="button"
                  aria-label="option-button"
                  className={cn("mx-auto w-full justify-start md:w-3/5")}
                  onClick={() => handleClickOption(answer, question.id)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("mx-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted transition", {
                        "bg-muted-foreground": answeredOption === answer,
                      })}
                    >
                      <p
                        className={cn("font-semibold text-muted-foreground transition", {
                          "text-activeOptionAnswer": answeredOption === answer,
                        })}
                      >
                        {indexToAlphabet(idx)}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "ml-2 w-full flex-1 whitespace-normal text-left text-sm text-muted-foreground transition",
                        {
                          "text-foreground": answeredOption === answer,
                        }
                      )}
                    >
                      {answer}
                    </p>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <QuizPager />
      </div>
    </section>
  )
}
