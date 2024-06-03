import { create } from "zustand"

interface State {
  courseId: string
}

const initialState: State = {
  courseId: "",
}

interface Action {
  setCourseId: (setCourseId: State["courseId"]) => void
  resetState: () => void
}

export const useClassStore = create<State & Action>((set) => ({
  ...initialState,
  setCourseId: (courseId) => set(() => ({ courseId: courseId })),
  resetState: () => {
    set(initialState)
  },
}))
