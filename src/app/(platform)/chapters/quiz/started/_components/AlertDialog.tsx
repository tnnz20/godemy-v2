"use client"

import { useSearchParams } from "next/navigation"
import { UpdateStatus } from "@/action/quiz"

import { Button } from "@/components/ui/button"

export function AlertStarted() {
  const searchParams = useSearchParams()
  const quiz = searchParams.get("quiz")
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black/80 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"></span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-semibold" id="modal-title">
                  Selamat Mengerjakan Kuis!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">Baca soal dengan teliti dan jawablah dengan cermat.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center bg-gray-50 px-4 py-3 sm:px-6 md:items-end md:justify-end">
            <Button type="button" onClick={async () => await UpdateStatus(quiz as string, 5)}>
              Lanjut
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
