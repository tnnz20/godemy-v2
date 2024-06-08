interface CompilerProps {
  src: string
}

export function Compiler({ src }: Readonly<CompilerProps>) {
  return (
    <div className="mx-4 mt-4 flex w-full justify-center">
      <iframe src={src} title="compiler" width="90%" height="450"></iframe>
    </div>
  )
}
