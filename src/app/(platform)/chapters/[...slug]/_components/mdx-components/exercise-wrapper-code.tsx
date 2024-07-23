"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Icons } from "@/components/icons"

import Compiler from "./compiler"

interface ExerciseCodeWrapperProps {
  children?: React.ReactNode
  params?: string
}

export default function ExerciseCodeWrapper({ children, params }: Readonly<ExerciseCodeWrapperProps>) {
  const [checkAnswer, setCheckAnswer] = useState(false)

  const handleCheckAnswer = () => {
    if (!checkAnswer) {
      setCheckAnswer(true)
    } else {
      setCheckAnswer(false)
    }
  }
  return (
    <div className="mt-4 h-auto">
      <Card className="">
        <CardHeader className="flex items-center ">
          <div className="flex items-center justify-center rounded-full bg-[#0072F5] p-2">
            <Icons.Fingerprint className="h-8 w-8 stroke-background stroke-[1.5]" />
          </div>
          <CardTitle className="text-xl">Waktunya untuk latihan code</CardTitle>
          <CardDescription>Ikuti instruksi di bawah dan kerjakan pada text editor yang disediakan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 rounded border p-2">
            <h4 className="text-lg font-semibold uppercase">Instruksi Soal</h4>
            <p>
              Buatlah 2 variabel untuk menampung nilai nama, umur, dan alamat lalu gunakan library fmt untuk menampilkan
              hasil dari variabel yang dibuat
            </p>
          </div>
          <Compiler params={params as string} />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <Button variant={"outline"} className="flex gap-2" onClick={() => handleCheckAnswer()}>
            <span className="sr-only">Check Answer</span>
            <p>Lihat Jawaban</p>
            {checkAnswer ? <Icons.EyeOff className="h-4 w-4" /> : <Icons.Eye className="h-4 w-4" />}
          </Button>
          {checkAnswer && <div className="w-full">{children}</div>}
        </CardFooter>
      </Card>
    </div>
  )
}
