"use client"

import React, { createContext, useContext, useMemo, useReducer } from "react"

import { ExerciseProps } from "./exercise-wrapper"

interface State {
  answer: string
  status: "idle" | "correct" | "incorrect"
}

type Action =
  | { type: "SET_ANSWER"; payload: string }
  | { type: "SET_STATUS"; payload: State["status"] }
  | { type: "RESET_STATE" }

const initialState: State = {
  answer: "",
  status: "idle",
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ANSWER":
      return { ...state, answer: action.payload }
    case "SET_STATUS":
      return { ...state, status: action.payload }
    case "RESET_STATE":
      return initialState
    default:
      return state
  }
}

export interface ContextValue extends State {
  setAnswer: (answer: string) => void
  setStatus: (status: State["status"]) => void
  resetState: () => void
  exerciseProps: ExerciseProps
}

export const ExerciseContext = createContext<ContextValue | undefined>(undefined)

export function useExercise() {
  return useContext(ExerciseContext)
}

interface ProviderProps {
  children: React.ReactNode
  exerciseProps: ExerciseProps
}

export const ExerciseProvider = ({ children, exerciseProps }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setAnswer = (answer: string) => dispatch({ type: "SET_ANSWER", payload: answer })
  const setStatus = (status: State["status"]) => dispatch({ type: "SET_STATUS", payload: status })
  const resetState = () => dispatch({ type: "RESET_STATE" })

  const value = useMemo<ContextValue>(
    () => ({ ...state, setAnswer, setStatus, resetState, exerciseProps }),
    [state, exerciseProps]
  )

  return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>
}
