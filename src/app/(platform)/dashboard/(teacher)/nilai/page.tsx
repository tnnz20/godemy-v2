import { Metadata } from "next"
import { cookies } from "next/headers"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import SelectClass from "../siswa/_components/select-class"
import Filter from "./_components/filter-dropdown"
import ScorePagination from "./_components/pagination"
import SearchStudent from "./_components/search-input"
import SelectCode from "./_components/select-code"
import ScoreTable from "./_components/table"

export const metadata: Metadata = {
  title: "Nilai",
  description: "Score page detail student score in godemy platform",
}

export default function ScorePage() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  return (
    <div className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mt-4 flex items-center">
        <SelectClass token={token as string} />
        <div className="ml-auto flex flex-col items-center gap-2">
          <div className="ml-auto flex items-center gap-2">
            <SelectCode />
            <Filter />
          </div>
          <SearchStudent />
        </div>
      </div>
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader>
          <CardTitle>Daftar nilai siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <ScoreTable token={token as string} />
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-end">
          <ScorePagination token={token as string} />
        </CardFooter>
      </Card>
    </div>
  )
}
