export type LoginState = {
  errors?: {
    email?: string[] | undefined
    password?: string[] | undefined
  }
  message?: string | null
}

export type ClassSate = {
  errors?: {
    code?: string[] | undefined
  }
  message: string
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

export type CreateCourseState = {
  errors?: {
    course_name?: string[] | undefined | null
  }
  message: string | null
}
