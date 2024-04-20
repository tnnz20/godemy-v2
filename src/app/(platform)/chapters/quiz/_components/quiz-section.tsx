"use client"

import { cn, indexToAlphabet } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { useLocalStorage } from "./_hooks/useLocalStorage"
import QuizPager from "./quiz-pager"
import { QuizContextValue, useQuiz } from "./quiz.provider"

export default function QuizSection() {
  const { currentQuestion, setCurrentClicked, questions } = useQuiz() as QuizContextValue

  const question = questions[currentQuestion]
  const [value, setValue] = useLocalStorage("answered", {})

  const handleClickOption = (idx: number, answer: string, questionId: number) => {
    setValue({ ...value, [questionId]: answer })
    setCurrentClicked(idx)
  }

  const answered = value[question?.id]

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
                  onClick={() => handleClickOption(idx, answer, question.id)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("mx-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted transition", {
                        "bg-muted-foreground": answered === answer,
                      })}
                    >
                      <p
                        className={cn("font-semibold text-muted-foreground transition", {
                          "text-activeOptionAnswer": answered === answer,
                        })}
                      >
                        {indexToAlphabet(idx)}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "ml-2 w-full flex-1 whitespace-normal text-left text-sm text-muted-foreground transition",
                        {
                          "text-foreground": answered === answer,
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
