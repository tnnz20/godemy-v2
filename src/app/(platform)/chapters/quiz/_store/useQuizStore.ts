import { create } from "zustand"
import { persist } from "zustand/middleware"

import { QuestionItem } from "@/types/quiz"

type Answered = {
  [key: number]: string
}

interface State {
  questions: QuestionItem[]
  answered: Answered
}

const initialState: State = {
  questions: [],
  answered: {},
}

interface Actions {
  setAnswered: (answered: Answered) => void
  resetAnswered: () => void
}

export type QuizStore = State & Actions

export function createQuizStore(questions: QuestionItem[]) {
  return create<QuizStore>()(
    persist(
      (set) => ({
        ...initialState,
        questions,
        setAnswered: (answered) => set({ answered }),
        resetAnswered: () => set({ answered: {} }),
      }),
      {
        name: "quiz-store",
        partialize: (state) => ({ answered: state.answered }),
      }
    )
  )
}
