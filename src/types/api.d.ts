export type APISuccessResponse = {
  code: number
  message: string
}

export type APIErrorResponse = {
  code: number
  error: {
    error_name: string
    error_description: string
  }
}

export type UserAssessmentResult = APISuccessResponse & {
  data?: UserAssessmentResultData
}

export type UserAssessmentResultData = {
  id: UUID
  users: UUID
  courses_id: UUID
  assessment_code: string
  assessment_value: number
  created_at: Date
  updated_at: Date
}

export type CoursesResultData = {
  id: UUID
  users_id: UUID
  course_name: string
  course_code: string
  created_at: Date
  updated_at: Date
}
