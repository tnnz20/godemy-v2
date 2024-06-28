import Footer from "../_components/footer"
import InstructionsHeader from "./_components/header"
import LoginContent from "./_components/instruction-login-content"
import RegisterContent from "./_components/instruction-register-content"

export default function InstructionsPage() {
  return (
    <div className="flex flex-col">
      <InstructionsHeader />
      <div className="flex flex-col items-center justify-center">
        <section className="container mx-auto max-w-4xl">
          <h1 className="inline-block space-y-2 font-heading text-4xl lg:text-5xl">Panduan Pengguna</h1>
          <div className="flex h-screen flex-col gap-4">
            <RegisterContent />
            <LoginContent />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
