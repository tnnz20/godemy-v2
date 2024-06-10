import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import EnrollForm from "./form"

export default function EnrollCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Insert Code</CardTitle>
        <CardDescription>Masukan kode kelas yang diberikan</CardDescription>
      </CardHeader>
      <CardContent>
        <EnrollForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <CardDescription>*kode kelas diberikan oleh guru </CardDescription>
      </CardFooter>
    </Card>
  )
}
