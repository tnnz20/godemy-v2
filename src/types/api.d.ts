export type APIResponse = {
  code: number
  message?: string
  error?: {
    error_name: string
    error_description: string
  }
}

export type UserAssessmentResult = APIResponse & {
  data?: UserAssessmentResultData[]
}

export type UserAssessmentResultData = {
  id: UUID
  users: UUID
  courses_id: UUID
  assessment_code: string
  assessment_value: number
  status: number
  created_at: Date
  updated_at: Date
}

export type AssessmentResultUsers = APIResponse & {
  data?: AssessmentResultUsersData[]
}

export type AssessmentResultUsersData = {
  id: UUID
  users_id: UUID
  name: string
  courses_id: UUID
  assessment_value: number
  assessment_code: string
  status: number
  created_at: Date
}

export type CoursesResult = APIResponse & {
  data?: CourseResultData[]
}

export type CourseResultData = {
  id: UUID
  users_id: UUID
  course_name: string
  course_code: string
  created_at: Date
  updated_at: Date
}

export type EnrolledUsersDetails = APIResponse & {
  data?: EnrolledUsersDetailsData[]
}

export type EnrolledUsersDetailsData = {
  courses_name: string
  id: UUID
  name: string
  progress: number
  updated_at: Date
}

export type TotalDataResponse = APIResponse & {
  data?: {
    total: number
  }
}
