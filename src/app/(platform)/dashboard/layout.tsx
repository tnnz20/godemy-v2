import { Metadata } from "next"

interface DocsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: `%s | "Dashboard"`,
  },
  description: "Dashboard Page for Godemy Learning",
}

export default function DocsLayout({ children }: Readonly<DocsLayoutProps>) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">{/* <SideNav /> */}</div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}
