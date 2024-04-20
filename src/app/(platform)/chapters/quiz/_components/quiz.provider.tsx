"use client"

import { createContext, useContext, useMemo, useState } from "react"

import { QuestionItem } from "@/types/quiz"

import { useLocalStorage } from "./_hooks/useLocalStorage"

// TODO: CHANGE THIS LOGIC USING API
type Answered = {
  [key: number]: string
}
export interface QuizContextValue {
  currentQuestion: number
  currentClicked: number | null
  answered: Answered
  setAnswered: (answered: Answered) => void
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

  const [localStorageValue] = useLocalStorage("answered", {})

  const [answered, setAnswered] = useState<Answered>(localStorageValue)

  const value = useMemo(
    () => ({
      currentQuestion,
      setCurrentQuestion,
      currentClicked,
      setCurrentClicked,
      answered,
      setAnswered,
      questions,
    }),
    [currentQuestion, currentClicked, answered, questions]
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
