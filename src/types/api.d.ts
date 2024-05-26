export type UserAssessmentResult = {
  code: number
  message: string
  data?: {
    id: UUID
    users: UUID
    courses_id: UUID
    assessment_code: string
    assessment_value: number
    created_at: Date
    updated_at: Date
  }
}
