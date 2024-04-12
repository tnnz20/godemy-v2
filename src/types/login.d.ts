export type LoginState = {
  errors?: {
    email?: string[] | undefined
    password?: string[] | undefined
  }
  message?: string | null
}
