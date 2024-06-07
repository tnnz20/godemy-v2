import { z } from "zod"

export const CourseSchema = z.object({
  code: z.string().min(6, { message: "Kode kelas minimal 6 karakter." }),
  course_name: z
    .string()
    .min(3, { message: "Nama kelas minimal 3 karakter." })
    .max(20, { message: "Nama kelas maksimal 20 karakter." }),
})
