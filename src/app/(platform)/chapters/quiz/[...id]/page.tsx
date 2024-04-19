import { notFound } from "next/navigation"
import { Questions, QuizEval } from "@/datastores/question"

import QuizAside from "../_components/quiz-aside"
import QuizHeader from "../_components/quiz-header"
import QuizSection from "../_components/quiz-section"
import { QuizProvider } from "../_components/quiz.provider"

interface QuizPageProps {
  params: {
    id: string
  }
}

function getQuestionFromId(id: string) {
  const questionId = parseInt(id)
  if (questionId === 7) {
    return QuizEval
  }
  const result = Questions.find((q) => q.chapterId === questionId)

  if (!result) notFound()

  return result
}

export default function QuizPage({ params }: Readonly<QuizPageProps>) {
  const question = getQuestionFromId(params.id)

  const shuffledQuestions = question.questions.slice().sort(() => Math.random() - 0.5)
  const shuffledObj = {
    ...question,
    questions: shuffledQuestions,
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <QuizHeader category={question?.category} />
      <div className="flex h-screen w-full flex-col-reverse justify-end md:flex-row md:justify-start">
        <QuizProvider questions={shuffledObj?.questions}>
          <QuizSection />
          <QuizAside />
        </QuizProvider>
      </div>
    </div>
  )
}
