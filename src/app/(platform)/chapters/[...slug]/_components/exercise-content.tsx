"use client"

import { useState } from "react"

import { cn, indexToAlphabet } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Icons } from "@/components/icons"

import { ContextValue, useExercise } from "./exercise.provider"

export default function ExerciseContent() {
  const { answer, status, setStatus, resetState, exerciseProps } = useExercise() as ContextValue

  const { correctAnswer, question, subQuestion, isCode } = exerciseProps

  const handleCheck = (correctAnswer: string) => {
    if (answer === correctAnswer) {
      setStatus("correct")
    } else {
      setStatus("incorrect")
    }
  }

  return (
    <Card className="mx-10 my-4 w-3/4 rounded-lg">
      <CardHeader className="">
        {isCode ? (
          <CardTitle className="text-md flex flex-col font-normal">
            <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border px-2 py-4">{question}</pre>
            <p>{subQuestion}</p>
          </CardTitle>
        ) : (
          <CardTitle className="text-md text-center font-normal">{question}</CardTitle>
        )}
        <CardDescription className="text-center text-sm">Pilih salah satu jawaban di bawah!</CardDescription>
      </CardHeader>

      <Card className="mx-4 rounded-lg">{status == "idle" ? <ExerciseOption /> : <ExerciseResult />}</Card>
      {status == "idle" && (
        <CardFooter className="flex justify-end py-2">
          <Button className="my-2 w-full md:w-auto" onClick={() => handleCheck(correctAnswer)}>
            Cek Jawaban
          </Button>
        </CardFooter>
      )}
      {status == "correct" && <CardFooter className="py-2"></CardFooter>}
      {status == "incorrect" && (
        <CardFooter className="flex justify-center py-2">
          <Button variant="outline" className="my-2 flex gap-2" onClick={() => resetState()}>
            <Icons.MoveLeft />
            Coba lagi
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

function ExerciseOption() {
  const { setAnswer, exerciseProps } = useExercise() as ContextValue

  const { answers } = exerciseProps
  const [isClicked, setIsClicked] = useState<number | null>(null)

  const handleClick = (index: number, value: string) => {
    setIsClicked(index)
    setAnswer(value)
  }

  return (
    <CardContent className="flex flex-col gap-2 border p-4">
      {answers.map((item, index) => (
        <Button
          variant={"outline"}
          onClick={() => handleClick(index, item)}
          className={cn("flex h-auto justify-start pl-4 transition", { "bg-muted": isClicked == index })}
          key={item}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn("bg-optionCircle mx-2 flex h-8 w-8 items-center justify-center rounded-full transition", {
                "bg-activeOptionCircle": isClicked == index,
              })}
            >
              <p
                className={cn("text-optionAnswer font-semibold transition", {
                  "text-activeOptionAnswer": isClicked == index,
                })}
              >
                {indexToAlphabet(index)}
              </p>
            </div>
            <p
              className={cn("ml-2 flex-1 whitespace-normal text-left text-muted-foreground transition", {
                "text-foreground": isClicked == index,
              })}
            >
              {item}
            </p>
          </div>
        </Button>
      ))}
    </CardContent>
  )
}

function ExerciseResult() {
  const { answer, status, exerciseProps } = useExercise() as ContextValue

  const { answers, explanation, hint } = exerciseProps
  const convertAlphabet = (answers: string[], answer: string) => {
    const idx = answers.indexOf(answer)
    return indexToAlphabet(idx)
  }

  const option = convertAlphabet(answers, answer)

  return (
    <>
      {status === "correct" ? (
        <CardContent className="flex min-h-[258px] flex-col items-center justify-center gap-2 p-4">
          <div
            className={cn("bg-activeOptionCircle  flex h-8 w-8 items-center justify-center rounded-full transition")}
          >
            <p className={cn("text-activeOptionAnswer transition")}>{option}</p>
          </div>
          <p className="text-md my-2 font-semibold">{answer}</p>
          <div className="bg-correctBadgeResult my-4 flex w-auto items-center justify-center gap-2 rounded-3xl px-3 py-2">
            <Icons.Check className="text-correctBadgeResultText flex h-4 w-4 items-center" />
            <p className="text-correctBadgeResultText text-sm font-semibold">Benar</p>
          </div>
          <p className="mx-auto w-full max-w-[380px] items-center justify-center text-center text-sm text-muted-foreground">
            {explanation}
          </p>
        </CardContent>
      ) : (
        <CardContent className="flex min-h-[258px] flex-col items-center justify-center gap-2 p-4">
          <div className={cn("flex  h-8 w-8 items-center justify-center rounded-full bg-muted transition")}>
            <p className={cn("text-muted-foreground transition")}>{option}</p>
          </div>
          <div className="bg-wrongBadgeResult my-4 flex w-auto items-center justify-center gap-2 rounded-3xl px-3 py-2">
            <Icons.Close className="text-wrongBadgeResultText flex h-4 w-4 items-center stroke-[3]" />
            <p className="text-wrongBadgeResultText text-sm font-semibold">Salah</p>
          </div>
          <p className="mx-auto w-full max-w-[380px] items-center justify-center text-center text-sm text-muted-foreground">
            petunjuk: {hint}
          </p>
        </CardContent>
      )}
    </>
  )
}
