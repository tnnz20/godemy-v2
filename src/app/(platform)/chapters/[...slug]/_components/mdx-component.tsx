import * as runtime from "react/jsx-runtime"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { Callout } from "./callout"
import { Compiler } from "./compiler"
import { ExerciseWrapper } from "./exercise-wrapper"

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image: CustomImage,
  h2: H2,
  h3: H3,
  p: Paragraph,
  ul: UnOrderedList,
  ol: OrderedList,
  li: List,
  pre: PreCode,
  code: Code,
  a: AnchorLink,
  table: Table,
  tr: TableRow,
  th: TableHeader,
  td: TableData,
  Callout,
  Exercise: ExerciseWrapper,
  Compiler: Compiler,
}

interface MdxProps {
  code: string
}

export function MDXContent({ code }: Readonly<MdxProps>) {
  const Component = useMDXComponent(code)
  return <Component components={{ ...components }} />
}

function H2({ className, ...props }: Readonly<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2
      className={cn("mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  )
}

function H3({ className, ...props }: Readonly<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2
      className={cn("mt-10 scroll-m-20 border-b pb-1 text-2xl font-semibold tracking-tight first:mt-0", className)}
      {...props}
    />
  )
}

function Paragraph({ className, ...props }: Readonly<React.HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
}

function UnOrderedList({ className, ...props }: Readonly<React.HTMLAttributes<HTMLUListElement>>) {
  return <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
}

function OrderedList({ className, ...props }: Readonly<React.HTMLAttributes<HTMLOListElement>>) {
  return <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
}

function List({ className, ...props }: Readonly<React.HTMLAttributes<HTMLLIElement>>) {
  return <li className={cn("mt-2 leading-7", className)} {...props} />
}

function PreCode({ className, ...props }: Readonly<React.HTMLAttributes<HTMLPreElement>>) {
  return <pre className={cn("my-4 overflow-x-auto rounded-lg border bg-black py-4", className)} {...props} />
}

function Code({ className, ...props }: Readonly<React.HTMLAttributes<HTMLElement>>) {
  return <code className={cn("relative rounded border p-1 font-mono text-sm font-medium", className)} {...props} />
}

function Table({ className, ...props }: Readonly<React.HTMLAttributes<HTMLTableElement>>) {
  return (
    <div className="my-4 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  )
}

function TableRow({ className, ...props }: Readonly<React.HTMLAttributes<HTMLTableRowElement>>) {
  return <tr className={cn("m-0 border-t p-0 even:bg-muted even:font-semibold", className)} {...props} />
}

function TableHeader({ className, ...props }: Readonly<React.HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <th
      className={cn(
        "border p-3 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  )
}

function TableData({ className, ...props }: Readonly<React.HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <td
      className={cn(
        "even:text-bold border p-4 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  )
}

function AnchorLink({ className, ...props }: Readonly<React.HTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a target="_blank" className={cn("font-medium underline underline-offset-4", className)} {...props}>
      {props.children}
    </a>
  )
}

function CustomImage({ ...props }) {
  return (
    <Image
      className="mx-auto my-4"
      width={parseInt(props.width)}
      height={parseInt(props.height)}
      alt={props.alt}
      src={props.src}
    />
  )
}
