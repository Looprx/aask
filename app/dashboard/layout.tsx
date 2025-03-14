import type { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
  teacher,
  student,
}: {
  children: ReactNode
  teacher: ReactNode
  student: ReactNode
}) {
  // In a real app, you would determine the user role from authentication
  // For this example, we'll use a hardcoded role
  const userRole = "teacher" // or "student"

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar userRole={userRole} />
        <div className="flex-1">{userRole === "teacher" ? teacher : student}</div>
      </div>
    </SidebarProvider>
  )
}

