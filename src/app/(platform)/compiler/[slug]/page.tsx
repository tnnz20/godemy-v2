import Compiler from "./_components/compiler"
import CompilerHeader from "./_components/header"

export default function CompilerPage({ params }: Readonly<{ params: { slug: string } }>) {
  console.log(params)
  return (
    <div className="flex h-screen flex-col">
      <CompilerHeader />
      <div className="flex-grow overflow-auto  p-4">
        <Compiler params={params.slug} />
      </div>
    </div>
  )
}
