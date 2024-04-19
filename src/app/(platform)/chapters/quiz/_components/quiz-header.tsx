import React from "react"

interface QuizHeaderProps {
  category: string | undefined
}

export default function QuizHeader({ category }: Readonly<QuizHeaderProps>) {
  return (
    <header className=" flex h-auto w-full border-b py-2 ">
      <div className="flex w-full max-w-screen-xl items-center justify-end md:justify-between lg:mx-auto lg:max-w-screen-2xl">
        <h1 className="mx-5 hidden text-base md:block lg:text-xl">Kategori: {category}</h1>
        <div className="mx-5 border p-3 md:border-0">
          <p>01:55</p>
        </div>
      </div>
    </header>
  )
}
