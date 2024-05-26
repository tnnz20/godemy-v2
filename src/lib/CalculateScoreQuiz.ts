import { QuestionItem } from "@/types/quiz"

export function CalculateScore(
  questions: QuestionItem[],
  answered: Record<number, string>
) {
  const answeredId = Object.keys(answered).map((key) => parseInt(key))
  const correctAnswer = questions.reduce((count, q) => {
    if (answeredId.includes(q.id) && q.answer === answered[q.id]) {
      return count + 1
    }
    return count
  }, 0)

  const totalQuestion = questions.length

  return (correctAnswer / totalQuestion) * 100
}
