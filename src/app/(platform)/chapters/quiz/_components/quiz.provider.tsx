"use client"

import { createContext, useContext, useMemo, useState } from "react"

import { QuestionItem } from "@/types/quiz"

export interface QuizContextValue {
  currentQuestion: number
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
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const value = useMemo(
    () => ({ currentQuestion, setCurrentQuestion, questions }),
    [currentQuestion, setCurrentQuestion, questions]
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
