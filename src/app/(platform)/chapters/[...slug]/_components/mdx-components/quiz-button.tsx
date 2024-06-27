"use client"

import { StartQuiz } from "@/action/quiz"

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
import { Button } from "@/components/ui/button"

interface QuizButtonProps {
  token: string
  paramsId: string
  randomArrayId: number[]
  isQuizPassed: boolean
}

export default function QuizButton({ token, paramsId, randomArrayId, isQuizPassed }: Readonly<QuizButtonProps>) {
  const handleStartQuiz = async () => {
    await StartQuiz(token, randomArrayId, paramsId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isQuizPassed}>Mulai kuis</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin akan memulai kuis?</AlertDialogTitle>
          <AlertDialogDescription>
            Ketika kuis dimulai anda tidak dapat kembali ke halaman sebelumnya.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction>
            <button onClick={async () => await handleStartQuiz()}>Lanjutkan</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
