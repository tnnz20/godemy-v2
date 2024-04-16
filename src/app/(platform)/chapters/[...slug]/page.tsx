import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { chapters } from "#site/content"

import { MDXContent } from "./_components/mdx-component"

type ChapterPageProps = {
  params: {
    slug: string[]
  }
}

async function getChapterFromParams(params: ChapterPageProps["params"]) {
  const slug = params?.slug?.join("/")
  const chapter = chapters.find((chapter) => chapter.slugAsParams === slug)

  return chapter
}

export async function generateStaticParams(): Promise<ChapterPageProps["params"][]> {
  return chapters.map((chapter) => ({ slug: chapter.slugAsParams.split("/") }))
}

export async function generateMetadata({ params }: Readonly<ChapterPageProps>): Promise<Metadata> {
  const chapter = await getChapterFromParams(params)

  if (!chapter) return {}

  return {
    title: chapter.title,
    description: chapter.description,
  }
}

export default async function ChapterPage({ params }: Readonly<ChapterPageProps>) {
  const chapter = await getChapterFromParams(params)

  if (!chapter) {
    notFound()
  }

  // TODO: FIX STYLING
  return (
    <article className="container mx-auto max-w-3xl bg-slate-400  py-6">
      <h1 className="mb-2">{chapter.title}</h1>
      <hr className="my-4" />
      <MDXContent code={chapter.body} />
    </article>
  )
}
