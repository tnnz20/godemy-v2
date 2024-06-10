export type LoginState = {
  errors?: {
    email?: string[] | undefined
    password?: string[] | undefined
  }
  message?: string | null
}

export type RegisterState = {
  errors?: {
    email?: string[]
    password?: string[]
    name?: string[]
    role?: string[]
  }
  message?: string | null
}
