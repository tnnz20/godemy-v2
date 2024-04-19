export type QuestionItem = {
  id: number
  question: string
  subQuestion?: string
  options: string[]
  answer: string
  isCode: boolean
}

export type QuestionConfig = {
  chapterId: number
  category: string
  questions: QuestionItem[]
}
