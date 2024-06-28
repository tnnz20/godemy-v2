import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import Footer from "./_components/footer"
import Navbar from "./_components/navbar"

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <section className="container flex min-h-screen flex-col items-center justify-center gap-2">
          <h1 className="mx-auto flex max-w-sm flex-col items-center justify-center text-center font-heading text-2xl font-medium md:max-w-md md:text-3xl lg:max-w-fit lg:flex-row lg:gap-1 lg:text-4xl">
            Media Pembelajaran
          </h1>
          <p className="max-w-[32rem] text-center text-base text-muted-foreground md:max-w-3xl md:text-xl lg:max-w-4xl ">
            Godemy adalah tempat di mana Anda dapat mengangkat kemampuan pemrograman Anda ke tingkat berikutnya, dengan
            fokus khusus pada penguasaan Golang. Platform kami didesain untuk memberikan panduan ahli, memandu Anda
            melalui setiap aspek Golang dengan penuh perhatian. Bergabunglah sekarang dan raih keahlian Golang Anda di
            Godemy!
          </p>
          <Button className={cn("mt-5")} asChild size={"lg"}>
            <Link href="/register">Mulai Sekarang</Link>
          </Button>
        </section>
      </div>
      <Footer />
    </div>
  )
}
