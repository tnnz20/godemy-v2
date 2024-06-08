import { Metadata } from "next"
import { notFound } from "next/navigation"
import { chapters } from "#site/content"

import { MDXContent } from "./_components/mdx-component"

import "@/styles/mdx.css"

import ChapterPager from "./_components/pager"

interface ChapterPageProps {
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

export default async function ChaptersPage({ params }: Readonly<ChapterPageProps>) {
  const chapter = await getChapterFromParams(params)

  if (!chapter) {
    notFound()
  }

  return (
    <article className="container mx-auto max-w-4xl">
      <div className="mx-auto w-full min-w-0 pb-4">
        {chapter.title != "Kuis" ? (
          <h1 className="inline-block space-y-4 font-heading text-4xl lg:text-5xl">{chapter.title}</h1>
        ) : (
          <div className="my-5"></div>
        )}
        <div className="h-full">
          <MDXContent code={chapter.body} />
        </div>
        <hr className="my-4 md:my-6" />
        <ChapterPager chapter={chapter} />
      </div>
    </article>
  )
}
