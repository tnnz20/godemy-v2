import { Metadata } from "next"

interface CoursesLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: "Courses",
    template: `%s | "Courses"`,
  },
  description: "Course Page Godemy Learning Platform",
}

export default function CoursesLayout({ children }: Readonly<CoursesLayoutProps>) {
  return <div className="flex min-h-screen w-full flex-col bg-muted/40">{children}</div>
}
