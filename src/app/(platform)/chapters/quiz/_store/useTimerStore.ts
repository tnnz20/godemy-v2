import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  timerEndTime: number | null
  timerDuration: number
}

interface Actions {
  startTimer: () => void
  resetTimer: () => void
}

export type TimerStore = State & Actions

export function createTimerStore(timerDuration: number) {
  const initialState: State = {
    timerEndTime: null,
    timerDuration,
  }

  return create<TimerStore>()(
    persist(
      (set, get) => ({
        ...initialState,
        startTimer: () => {
          const currentEndTime = get().timerEndTime
          const duration = get().timerDuration
          if (!currentEndTime || currentEndTime <= Date.now()) {
            set({ timerEndTime: Date.now() + duration })
          }
        },
        resetTimer: () => set({ timerEndTime: null }),
      }),
      {
        name: "timer-store",
        partialize: (state) => ({
          timerEndTime: state.timerEndTime,
          timerDuration: state.timerDuration,
        }),
      }
    )
  )
}
