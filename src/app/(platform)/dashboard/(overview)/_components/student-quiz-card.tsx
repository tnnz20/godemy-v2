import { cookies } from "next/headers"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import StudentQuizTable from "./student-quiz-table"

export default async function DashboardStudentQuizCard() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  return (
    <div>
      <Card x-chunk="dashboard-03-chunk-0">
        <CardHeader className="px-7">
          <CardTitle>Riwayat Kuis</CardTitle>
          <CardDescription>Pilih riwayat kuis yang ingin dilihat.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chap-1">
            <TabsList>
              <TabsTrigger value="chap-1">Chapter 1</TabsTrigger>
              <TabsTrigger value="chap-2">Chapter 2</TabsTrigger>
              <TabsTrigger value="chap-3">Chapter 3</TabsTrigger>
              <TabsTrigger value="chap-4">Chapter 4</TabsTrigger>
              <TabsTrigger value="chap-5">Chapter 5</TabsTrigger>
              <TabsTrigger value="chap-6">Chapter 6</TabsTrigger>
              <TabsTrigger value="chap-7">Evaluasi</TabsTrigger>
            </TabsList>
            <TabsContent value="chap-1">
              <StudentQuizTable token={token as string} assessmentCode={1} />
            </TabsContent>
            <TabsContent value="chap-2">
              <StudentQuizTable token={token as string} assessmentCode={2} />
            </TabsContent>
            <TabsContent value="chap-3">
              <StudentQuizTable token={token as string} assessmentCode={3} />
            </TabsContent>
            <TabsContent value="chap-4">
              <StudentQuizTable token={token as string} assessmentCode={4} />
            </TabsContent>
            <TabsContent value="chap-5">
              <StudentQuizTable token={token as string} assessmentCode={5} />
            </TabsContent>
            <TabsContent value="chap-6">
              <StudentQuizTable token={token as string} assessmentCode={6} />
            </TabsContent>
            <TabsContent value="chap-7">
              <StudentQuizTable token={token as string} assessmentCode={7} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
