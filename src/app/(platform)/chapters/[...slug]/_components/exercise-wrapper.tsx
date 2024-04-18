import React from "react"

import { Icons } from "@/components/icons"

import ExerciseContent from "./exercise-content"
import { ExerciseProvider } from "./exercise.provider"

export interface ExerciseProps {
  answers: string[]
  correctAnswer: string
  explanation: string
  hint: string
  question: string
  subQuestion: string
  isCode: boolean
}

export function ExerciseWrapper(props: Readonly<ExerciseProps>) {
  return (
    <ExerciseProvider exerciseProps={props}>
      <ExerciseCard />
    </ExerciseProvider>
  )
}

function ExerciseCard() {
  return (
    <div className="mt-4 flex h-auto max-w-5xl flex-col items-center justify-center md:mx-28">
      <div className="my-4 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-[#0072F5] p-2">
          <Icons.HelpCircle className="h-10 w-10 stroke-background stroke-[1.5]" />
        </div>
        <p className="text-lg">Waktunya untuk latihan soal!</p>
        <p className="text-pretty text-center text-sm text-slate-500">
          Uji Pengetahuan anda dan lihat apa saja ilmu yang telah anda pelajari.
        </p>
      </div>
      <ExerciseContent />
    </div>
  )
}
