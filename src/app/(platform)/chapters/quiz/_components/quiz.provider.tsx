"use client"

import { createContext, useContext, useMemo, useState } from "react"

import { QuestionItem } from "@/types/quiz"

export interface QuizContextValue {
  currentQuestion: number
  currentClicked: number | null
  setCurrentClicked: (currentClicked: number | null) => void
  setCurrentQuestion: (currentQuestion: number) => void
  questions: QuestionItem[]
}

export const QuizContext = createContext<QuizContextValue | undefined>(undefined)

export function useQuiz() {
  return useContext(QuizContext)
}

interface ProviderProps {
  children: React.ReactNode
  questions: QuestionItem[]
}

export const QuizProvider = ({ children, questions }: ProviderProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [currentClicked, setCurrentClicked] = useState<number | null>(null)

  const value = useMemo(
    () => ({ currentQuestion, setCurrentQuestion, currentClicked, setCurrentClicked, questions }),
    [currentQuestion, currentClicked, questions]
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
