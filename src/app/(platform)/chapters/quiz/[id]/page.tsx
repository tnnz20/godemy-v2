import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { Questions, QuizEval } from "@/datastores/question"

import { QuestionItem } from "@/types/quiz"
import { GetAssessmentUser } from "@/lib/data/assessment/assessment"

import QuizAside from "../_components/quiz-aside"
import QuizHeader from "../_components/quiz-header"
import QuizSection from "../_components/quiz-section"
import { QuizStoreProvider } from "../_provider/quiz.provider"

interface QuizPageProps {
  params: {
    id: string
  }
}

function GetQuestionFromId(id: string) {
  const questionId = parseInt(id)
  if (questionId === 7) {
    return QuizEval
  }
  const result = Questions.find((q) => q.chapterId === questionId)

  if (!result) notFound()

  return result
}

function DecodeBASE64toArray(BASE64RandomArrayId: string): number[] {
  const BASE64RandomArrayIdDecode = atob(BASE64RandomArrayId)
  // Remove the curly braces from the string
  const sliceStr = BASE64RandomArrayIdDecode.slice(1, -1)

  const array = sliceStr.split(",").map((item) => parseInt(item))
  return array
}

export default async function QuizPage({ params }: Readonly<QuizPageProps>) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  const question = GetQuestionFromId(params.id)
  const questionItem = question?.questions

  const assessmentUser = await GetAssessmentUser(token, params.id)
  const BASE64RandomArrayId = assessmentUser?.data?.random_array_id
  const randomArrayId = DecodeBASE64toArray(BASE64RandomArrayId)

  const orderedQuestions = randomArrayId.map((id) => questionItem.find((obj) => obj.id === id))

  return (
    <div className="flex h-screen flex-col">
      <QuizHeader category={question?.category} />
      <div className="flex h-screen flex-col-reverse justify-end md:flex-row md:justify-start">
        <QuizStoreProvider questions={orderedQuestions as QuestionItem[]}>
          <QuizSection />
          <QuizAside />
        </QuizStoreProvider>
      </div>
    </div>
  )
}
