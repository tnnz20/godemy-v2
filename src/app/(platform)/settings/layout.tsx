import { Metadata } from "next"

import SettingsAside from "./_components/aside"
import SettingsNav from "./_components/nav"

interface SettingsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: "Settings",
    template: `%s | "Settings"`,
  },
  description: "Settings Page Godemy Learning Platform",
}

export default function SettingsLayout({ children }: Readonly<SettingsLayoutProps>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <SettingsNav />
      </header>
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <SettingsAside />
          {children}
        </div>
      </div>
    </div>
  )
}
