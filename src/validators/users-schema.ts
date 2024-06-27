import { z } from "zod"

export const UsersSchema = z.object({
  name: z
    .string({
      required_error: "Nama wajib di isi",
      invalid_type_error: "Name must be a string",
    })
    .min(4, { message: "Mohon masukan nama lebih dari 4 karakter." }),
  date: z
    .number({
      required_error: "Tanggal lahir wajib di isi",
      invalid_type_error: "date must be a number",
    })
    .gt(1, { message: "Mohon masukan tanggal lahir." }),
  gender: z
    .string({
      required_error: "Jenis kelamin wajib di isi",
      invalid_type_error: "gender must be a string",
    })
    .min(4, { message: "Mohon pilih jenis kelamin." }),
  address: z
    .string({
      required_error: "Alamat wajib di isi",
      invalid_type_error: "address must be a string",
    })
    .min(6, { message: "Mohon masukan alamat lebih dari 6 karakter." }),
})
