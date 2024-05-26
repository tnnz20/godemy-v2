import { UUID } from "crypto"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { UserAssessmentResult } from "@/types/api"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function indexToAlphabet(index: number) {
  const charCodeA = "A".charCodeAt(0)
  return String.fromCharCode(charCodeA + index)
}

export function DecodeJWT(token: string = "") {
  const decodableToken = token.split(".")[1] ?? ""
  const decoded = Buffer.from(decodableToken, "base64").toString()

  return JSON.parse(decoded)
}

export function CheckAssessmentValue(response: UserAssessmentResult) {
  const { code, data } = response || {}
  const { assessment_value } = data || {}

  return code === 200 && (assessment_value as number) >= 80
}
