"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

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

function generateRandomArray(min: number, max: number, length: number) {
  const randomArray: number[] = []

  for (let i = min; i <= max; i++) {
    randomArray.push(i)
  }
  const sortedArray = randomArray.toSorted(() => Math.random() - 0.5)
  return sortedArray
}

export function ChapterStartQuizButton() {
  const params = useParams()

  const randomId = generateRandomArray(1, 5, 5)
  console.log("🚀 ~ ChapterStartQuizButton ~ randomId:", randomId)

  const handleStartQuiz = (randomArray: number[]) => {
    localStorage.setItem("quiz-started", "waiting")
    localStorage.setItem("desiredId", JSON.stringify(randomArray))
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
              <button onClick={() => handleStartQuiz(randomId)}>
                <Link href={`/chapters/quiz/${params?.slug[0]}`}>Lanjutkan</Link>
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
