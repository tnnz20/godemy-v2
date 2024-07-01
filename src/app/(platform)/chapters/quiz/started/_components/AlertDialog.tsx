"use client"

import { useSearchParams } from "next/navigation"
import { UpdateStatus } from "@/action/quiz"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AlertStarted() {
  const searchParams = useSearchParams()
  const quiz = searchParams.get("quiz")
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Selamat Mengerjakan Kuis!</AlertDialogTitle>
          <AlertDialogDescription>Baca soal dengan teliti dan jawablah dengan cermat.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={async () => await UpdateStatus(quiz as string, 5)}>Lanjutkan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
