import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { UserAssessmentResult } from "@/types/api"
import { QuestionItem } from "@/types/quiz"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function indexToAlphabet(index: number) {
  const charCodeA = "A".charCodeAt(0)
  return String.fromCharCode(charCodeA + index)
}

export function DecodeJWT(token: string = "") {
  const decodableToken = token.split(".")[1] ?? ""
  const decoded = Buffer.from(decodableToken, "base64").toString()

  return JSON.parse(decoded)
}

export function CheckAssessmentValue(response: UserAssessmentResult) {
  if (response) {
    const { code, data } = response
    const assessment_value = data?.[0]?.assessment_value

    return code === 200 && (assessment_value as number) >= 80
  } else {
    return false
  }
}

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

export function FormattedDate(date: string): string {
  const [dateTimeString] = date.split(".")
  const [dateString, timeString] = dateTimeString.split("T")
  const [year, month, day] = dateString.split("-")
  const [hours, minutes] = timeString.split(":")

  return `${day}-${month}-${year} ${hours}:${minutes}`
}

export function convertUnixToDate(unix: number) {
  if (unix === 0) {
    return "-"
  }

  const date = new Date(unix * 1000)
  return date.toLocaleString()
}
