"use client"

import { useState } from "react"

import { cn, indexToAlphabet } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import QuizPager from "./quiz-pager"
import { QuizContextValue, useQuiz } from "./quiz.provider"

export default function QuizSection() {
  const { currentQuestion, questions } = useQuiz() as QuizContextValue
  const [isClicked, setIsClicked] = useState<number | null>(null)

  const question = questions[currentQuestion]

  return (
    <section className="container h-screen flex-none md:my-10 md:ml-10 lg:mx-auto lg:my-12 lg:ml-24">
      <div className={cn("flex flex-col justify-between", { "gap-44": !question?.isCode, "gap-36": question?.isCode })}>
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
                  onClick={() => setIsClicked(idx)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("mx-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted transition", {
                        "bg-muted-foreground": isClicked == idx,
                      })}
                    >
                      <p
                        className={cn("font-semibold text-muted-foreground transition", {
                          "text-activeOptionAnswer": isClicked == idx,
                        })}
                      >
                        {indexToAlphabet(idx)}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "ml-2 w-full flex-1 whitespace-normal text-left text-sm text-muted-foreground transition",
                        {
                          "text-foreground": isClicked == idx,
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
