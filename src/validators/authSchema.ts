import { z } from "zod"

export const AuthSchema = z.object({
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
  role: z.enum(["teacher", "student"]),
})
