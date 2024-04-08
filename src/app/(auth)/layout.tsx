import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

export default function LayoutAuth({ children }: Readonly<LayoutProps>) {
  return (
    <div className="flex flex-col">
      {/* <NavigationHome /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  )
}
