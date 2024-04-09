export type RegisterState = {
  errors: {
    email?: string[]
    password?: string[]
    name?: string[]
    gender?: string[]
    role?: string[]
  }
  message?: string | null
}
