"use client"

import { useParams } from "next/navigation"
import { StartQuiz } from "@/action/start-quiz"

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

function generateRandomArray(min: number, max: number) {
  const randomArray: number[] = []

  for (let i = min; i <= max; i++) {
    randomArray.push(i)
  }
  const sortedArray = randomArray.toSorted(() => Math.random() - 0.5)
  return sortedArray
}

interface ChapterStartQuizButtonProps {
  token: string | undefined
}
export function ChapterStartQuizButton({ token }: Readonly<ChapterStartQuizButtonProps>) {
  const params = useParams()
  const paramId = params?.slug[0]
  const maxLength = paramId === "7" ? 20 : 5
  const randomArrayId = generateRandomArray(1, maxLength)
  console.log(token)
  const handleStartQuiz = async () => {
    await StartQuiz(token as string, randomArrayId, paramId)
  }
  return (
    <div className="my-8 flex justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Mulai kuis</Button>
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
    </div>
  )
}
