import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import ClassForm from "./class-form"

export default function ClassCard() {
  return (
    <Card className="mx-auto w-[350px] md:w-[400px]">
      <CardHeader className="flex items-center">
        <CardTitle>Kode Kelas</CardTitle>
        <CardDescription className="text-center">Masukan kode kelas</CardDescription>
      </CardHeader>
      <CardContent className="relative overflow-hidden p-0 px-6">
        <ClassForm />
      </CardContent>
      <CardFooter>
        <CardDescription>*kode kelas diberikan oleh guru </CardDescription>
      </CardFooter>
    </Card>
  )
}
