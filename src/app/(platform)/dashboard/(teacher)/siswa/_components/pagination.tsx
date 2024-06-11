"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { GetTotalEnrolledUsers } from "@/lib/GetTotalEnrolledUsers"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"

import { Icons } from "@/components/icons"

export default function DashboardPagination() {
  const [data, setData] = useState<number>(0)
  const [pending, setPending] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const totalPage = Math.ceil(data / 6)
  const currentPage = parseInt(searchParams.get("page") ?? "1")

  const courseId = searchParams.get("courseId")?.toString() ?? ""
  const name = searchParams.get("name")?.toString() ?? ""

  const handlePagination = () => {
    const params = new URLSearchParams(searchParams)
    if (currentPage > 1) {
      params.set("page", (currentPage - 1).toString())
    } else {
      params.set("page", (currentPage + 1).toString())
    }
    replace(`${pathname}?${params}`)
  }

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setPending(true)
      try {
        const totalEnrolled = await GetTotalEnrolledUsers(courseId, name)
        if (totalEnrolled === 404) {
          setError(true)
        }
        setData(totalEnrolled?.data?.total)
      } catch (error) {
        console.log(error)
      } finally {
        setPending(false)
      }
    }

    fetchDataFromAPI()
  }, [courseId, name])

  if (pending) {
    return <div>Loading...</div>
  }

  return (
    <>
      {!data || error ? null : (
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
                  onClick={() => handlePagination()}
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
                  onClick={() => handlePagination()}
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
