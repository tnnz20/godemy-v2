import { cookies } from "next/headers"

import ClassCard from "./_components/card"
import DialogAddCourse from "./_components/dialog-add-course"
import SearchClass from "./_components/search-input"

export default async function ClassPage() {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")?.value

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-5">
      <div className="flex items-center">
        <div className="ml-auto flex flex-col items-center gap-2">
          <div className="ml-auto flex gap-2">
            <DialogAddCourse />
          </div>
          <SearchClass />
        </div>
      </div>
      <ClassCard token={token as string} />
    </div>
  )
}
