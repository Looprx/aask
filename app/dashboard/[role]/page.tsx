import { redirect } from "next/navigation"

export default function RolePage({ params }: { params: { role: string } }) {
  // Redirect to the appropriate dashboard based on role
  if (params.role === "teacher") {
    redirect("/dashboard")
  } else if (params.role === "student") {
    redirect("/dashboard")
  } else {
    // If invalid role, redirect to login
    redirect("/login")
  }

  return null
}

