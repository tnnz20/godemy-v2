interface CompilerProps {
  params: string
}

export default function Compiler({ params }: Readonly<CompilerProps>) {
  return (
    <div className="flex h-full justify-center">
      <iframe src={`https://goplay.tools/snippet/${params}`} title="compiler" width="100%" height="auto"></iframe>
    </div>
  )
}
