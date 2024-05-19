"use client"

import { createContext, useContext, useRef } from "react"
import { useStore, type StoreApi } from "zustand"

import { QuestionItem } from "@/types/quiz"

import { createQuizStore, type QuizStore } from "../store/useQuizStore"

export const QuizStoreContext = createContext<StoreApi<QuizStore> | undefined>(undefined)

interface QuizProviderProps {
  children: React.ReactNode
  questions: QuestionItem[]
}

export const QuizStoreProvider = ({ children, questions }: QuizProviderProps) => {
  const storeRef = useRef(createQuizStore(questions))
  return <QuizStoreContext.Provider value={storeRef.current}>{children}</QuizStoreContext.Provider>
}

export const useQuizStore = <T,>(selector: (store: QuizStore) => T): T => {
  const quizStoreContext = useContext(QuizStoreContext)
  if (!quizStoreContext) {
    throw new Error("useQuizStore must be used within a QuizStoreProvider")
  }
  return useStore(quizStoreContext, selector)
}
