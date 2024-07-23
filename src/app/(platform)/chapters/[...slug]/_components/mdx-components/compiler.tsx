type CompilerProps = {
  params: string
}

export default function Compiler({ params }: Readonly<CompilerProps>) {
  return (
    <div>
      <iframe src={`https://goplay.tools/snippet/${params}`} title="compiler" width="100%" height="500px"></iframe>
    </div>
  )
}
