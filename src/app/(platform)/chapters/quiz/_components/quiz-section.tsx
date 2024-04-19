"use client"

import { useState } from "react"

import { cn, indexToAlphabet } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { QuizContextValue, useQuiz } from "./quiz.provider"

export default function QuizSection() {
  const { currentQuestion, questions } = useQuiz() as QuizContextValue
  const [isClicked, setIsClicked] = useState<number | null>(null)

  return (
    <section className="container flex-none md:my-10 md:ml-10 lg:mx-auto lg:my-12 lg:ml-24">
      <div className="mt-5 flex h-full flex-col gap-5">
        <h2 className="text-sm md:text-base/6 lg:text-lg">{questions[currentQuestion].question}</h2>
        <ul className="flex flex-col gap-4">
          {questions[currentQuestion].options.map((answer: string, idx) => (
            <li key={answer}>
              <Button
                variant={"ghost"}
                type="button"
                aria-label="option-button"
                className={cn("mx-auto w-3/5 justify-start")}
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
                    className={cn("ml-2 flex-1 whitespace-normal text-left text-muted-foreground transition", {
                      "text-foreground": isClicked == idx,
                    })}
                  >
                    {answer}
                  </p>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
