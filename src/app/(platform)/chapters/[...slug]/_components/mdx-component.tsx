import * as runtime from "react/jsx-runtime"
import Image from "next/image"

import { cn } from "@/lib/utils"

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image,
  h1: H1,
}

interface MdxProps {
  code: string
}

export function MDXContent({ code }: Readonly<MdxProps>) {
  const Component = useMDXComponent(code)
  return <Component components={{ ...components }} />
}

function H1({ className, ...props }: Readonly<React.HTMLAttributes<HTMLHeadingElement>>) {
  return <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl", className)} {...props} />
}
