import { Metadata } from "next"

import ClassCard from "./_components/class-card"

export const metadata: Metadata = {
  title: "Register Class",
  description: "Class page to register new student class godemy",
}

export default function ClassRegister() {
  return <ClassCard />
}
