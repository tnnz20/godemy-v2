import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

export default function LayoutAuth({ children }: Readonly<LayoutProps>) {
  return (
    <div className="flex flex-col">
      {/* <NavigationHome /> */}
      <div className="container flex h-screen w-full items-center justify-center">{children}</div>
      {/* <Footer /> */}
    </div>
  )
}
