import ChapterNav from "./_components/chapter-nav"
import ChapterSidebarNavWrapper from "./_components/chapter-sidebar-nav-wrapper"

interface ChaptersLayoutProps {
  children: React.ReactNode
}

// TODO: fix div h-screen
export default function ChaptersLayout({ children }: Readonly<ChaptersLayoutProps>) {
  return (
    <div className="flex flex-col">
      <ChapterNav />
      <div className="flex h-screen overflow-hidden">
        <div className="flex flex-1 overflow-y-auto">{children}</div>
        <ChapterSidebarNavWrapper />
      </div>
    </div>
  )
}
