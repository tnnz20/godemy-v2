"use client"

import React from "react"
import { useShallow } from "zustand/react/shallow"

import { useClassStore } from "../_store/useClassStore"

export default function TableSiswa() {
  const [courseId] = useClassStore(useShallow((state) => [state.courseId]))
  console.log("🚀 ~ DaftarSiswaPage ~ courseId:", courseId)
  return <div>TableSiswa</div>
}
