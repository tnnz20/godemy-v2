export type RegisterState = {
  errors: {
    email?: string[]
    password?: string[]
    name?: string[]
    role?: string[]
  }
  message?: string | null
}
