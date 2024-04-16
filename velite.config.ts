import { defineCollection, defineConfig, s } from "velite"

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
})

const chapters = defineCollection({
  name: "Chapter",
  pattern: "chapters/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(100),
      chapter: s.number(),
      description: s.string().max(999).optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { chapters },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
})
