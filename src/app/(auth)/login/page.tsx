import { Metadata } from "next"

import LoginCard from "./_components/login-card"

export const metadata: Metadata = {
  title: "Login",
  description: "Login page to login account godemy",
}

export default function LoginPage() {
  return <LoginCard />
}
