import Footer from "./_components/footer"
import Navbar from "./_components/navbar"

interface LayoutProps {
  children: React.ReactNode
}

export default function LayoutHome({ children }: Readonly<LayoutProps>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
