import { useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitQuiz, UpdateStatus } from "@/action/quiz"

import { CalculateScore } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Icons } from "@/components/icons"

import { useQuizStore } from "../_provider/quiz.provider"
import { createTimerStore } from "../_store/useTimerStore"

interface AlertSubmitDialogProps {
  children: React.ReactNode
  paramId: string
}
export default function AlertSubmitDialog({ children, paramId }: Readonly<AlertSubmitDialogProps>) {
  const timer = String(paramId) === "7" ? 45 * 60 * 1000 : 15 * 60 * 1000
  const useTimerStore = createTimerStore(timer)

  const { answered, questions, resetAnswered } = useQuizStore((state) => ({
    answered: state.answered,
    questions: state.questions,
    resetAnswered: state.resetAnswered,
  }))

  const { resetTimer } = useTimerStore((state) => ({
    resetTimer: state.resetTimer,
  }))

  const [isLoading, setIsLoading] = useState(false)
  const Score = CalculateScore(questions, answered)
  const router = useRouter()
  const handleSubmit = async (score: number, paramId: string) => {
    setIsLoading(true)
    resetAnswered()
    resetTimer()
    await SubmitQuiz(score, paramId)
    await UpdateStatus(paramId, 10)

    const validScore = score >= 80
    const path = paramId === "7" ? `${paramId}/evaluasi` : `${paramId}/kuis`
    router.push(`/chapters/${path}?score=${validScore}`)
    setIsLoading(false)
    router.refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isLoading ? (
          <>
            <Icons.Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin untuk mengakhiri kuis ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Ini akan mengakhiri kuis Anda secara permanen dan menyimpan semua
            jawaban yang telah dipilih sebelumnya.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleSubmit(Score, paramId)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
