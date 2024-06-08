import ChapterNav from "./_components/nav"
import ChapterSidebarWrapper from "./_components/sidebar-wrapper"

interface ChaptersLayoutProps {
  children: React.ReactNode
}

// TODO: fix bug sidebar
export default function ChaptersLayout({ children }: Readonly<ChaptersLayoutProps>) {
  return (
    <div className="flex flex-col">
      <ChapterNav />
      <div className="flex h-screen">
        <div className="flex flex-1 overflow-y-auto">{children}</div>
        <ChapterSidebarWrapper />
      </div>
    </div>
  )
}
