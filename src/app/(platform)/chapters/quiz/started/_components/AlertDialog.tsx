"use client"

import { useState } from "react"
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

import { Icons } from "@/components/icons"

export function AlertStarted() {
  const searchParams = useSearchParams()
  const quiz = searchParams.get("quiz")

  const [isLoading, setIsLoading] = useState(false)
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icons.Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span>Loading...</span>
      </div>
    )
  }
  const handleUpdateStatus = async () => {
    setIsLoading(true)
    await UpdateStatus(quiz as string, 5)
    setIsLoading(false)
  }
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Selamat Mengerjakan Kuis!</AlertDialogTitle>
          <AlertDialogDescription>Baca soal dengan teliti dan jawablah dengan cermat.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => handleUpdateStatus()}>Lanjutkan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
