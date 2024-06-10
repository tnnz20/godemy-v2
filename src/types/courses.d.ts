export type EnrollCourseSate = {
  errors?: {
    code?: string[] | undefined
  }
  message: string
}

export type CreateCourseState = {
  errors?: {
    course_name?: string[] | undefined | null
  }
  message: string | null
}
