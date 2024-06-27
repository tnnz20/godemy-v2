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

import { useQuizStore } from "../_provider/quiz.provider"
import { createTimerStore } from "../_store/useTimerStore"

interface AlertSubmitDialogProps {
  children: React.ReactNode
  paramId: string
}
const useTimerStore = createTimerStore(15 * 60 * 1000) // 15 minutes
export default function AlertSubmitDialog({ children, paramId }: Readonly<AlertSubmitDialogProps>) {
  const { answered, questions, resetAnswered } = useQuizStore((state) => ({
    answered: state.answered,
    questions: state.questions,
    resetAnswered: state.resetAnswered,
  }))

  const { resetTimer } = useTimerStore((state) => ({
    resetTimer: state.resetTimer,
  }))

  const Score = CalculateScore(questions, answered)
  const router = useRouter()

  const handleSubmit = async (score: number, paramId: string) => {
    resetAnswered()
    resetTimer()
    await SubmitQuiz(score, paramId)
    await UpdateStatus(paramId, 10)

    const path = paramId === "7" ? `${paramId}/evaluasi` : `${paramId}/kuis`
    router.push(`/chapters/${path}`)
    router.refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
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
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            <button onClick={() => handleSubmit(Score, paramId)}>Submit</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
