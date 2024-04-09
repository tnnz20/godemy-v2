import { z } from "zod"

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak kosong." })
    .pipe(
      z.string().email({
        message: "Mohon masukkan format email yang benar.",
      })
    ),
  password: z.string().min(6, {
    message: "Password minimal 6 karakter.",
  }),
  name: z
    .string()
    .min(4, { message: "Mohon masukan nama lebih dari 4 karakter." }),
  gender: z.enum(["Laki-Laki", "Perempuan"], {
    errorMap: (issue, ctx) => {
      switch (issue.code) {
        case "invalid_enum_value":
          return { message: "Mohon pilih salah satu jenis kelamin." }
        case "invalid_type":
          return { message: "Jenis kelamin harus string." }
        default:
          return { message: ctx.defaultError }
      }
    },
  }),
  role: z.enum(["teacher", "student"]),
})
