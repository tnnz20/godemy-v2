"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { TotalDataResponse } from "@/types/api"
import { GetTotalEnrolledUsers } from "@/lib/data/courses/enrollment"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"

import { Icons } from "@/components/icons"

export default function StudentPagination() {
  const [data, setData] = useState<TotalDataResponse>()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const total = data?.data?.total ?? 0
  const totalPage = Math.ceil(total / 6)
  const currentPage = parseInt(searchParams.get("page") ?? "1")

  const courseId = searchParams.get("courseId")?.toString() ?? ""
  const name = searchParams.get("name")?.toString() ?? ""

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    replace(`${pathname}?${params}`)
  }

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const totalEnrolled = await GetTotalEnrolledUsers(courseId, name)
        setData(totalEnrolled)
      } catch (error) {
        console.log(error)
      }
    }

    fetchDataFromAPI()
  }, [courseId, name])

  return (
    <>
      {data?.code !== 200 ? null : (
        <div className="flex items-center gap-8">
          <p className="text-sm">
            Halaman {currentPage} dari <span className="font-semibold">{totalPage}</span>
          </p>
          <Pagination className="ml-auto mr-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  disabled={currentPage == 1}
                  onClick={() => handlePagination(currentPage - 1)}
                >
                  <Icons.ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous Data</span>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  disabled={currentPage >= totalPage}
                  onClick={() => handlePagination(currentPage + 1)}
                >
                  <Icons.ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next Data</span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  )
}
