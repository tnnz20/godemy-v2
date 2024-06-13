"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { CourseResultData } from "@/types/api"
import { FormattedDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

import { Icons } from "@/components/icons"

interface ClassTableProps {
  courses: CourseResultData[]
}

export default function ClassTable({ courses }: Readonly<ClassTableProps>) {
  const [copied, setCopied] = useState<string | null>(null)
  const router = useRouter()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
  }

  const handleDetail = (id: string) => {
    router.push(`/dashboard/siswa?courseId=${id}`)
  }

  const { toast } = useToast()

  useEffect(() => {
    if (copied) {
      toast({
        title: "Salin berhasil!",
        description: `Kode kelas ${copied} berhasil disalin.`,
      })
    }
    setCopied(null)
  }, [toast, copied])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal Pembuatan</TableHead>
          <TableHead>Nama Kelas</TableHead>
          <TableHead>Kode Kelas</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses?.map((course: CourseResultData) => (
          <TableRow key={course.id}>
            <TableCell>{FormattedDate(String(course?.created_at))}</TableCell>
            <TableCell>{course?.course_name}</TableCell>
            <TableCell>{course?.course_code}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <Icons.MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleCopy(course?.course_code)}>Copy Kode</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDetail(course?.id)}>Lihat Kelas</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
