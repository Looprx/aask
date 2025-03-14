"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, LayoutDashboard, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  userRole: "teacher" | "student"
}

// Simplify the sidebar to only have a single dashboard link
export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-3">
        <div className="flex items-center gap-2 font-semibold">
          <Calendar className="h-5 w-5 text-primary" />
          <span>TimeTable Pro</span>
        </div>
        <SidebarTrigger className="absolute right-2 top-3 lg:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes("/dashboard")} tooltip="Dashboard">
              <Link href={`/dashboard/${userRole}`}>
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{userRole === "teacher" ? "TC" : "ST"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{userRole === "teacher" ? "John Smith" : "Alex Johnson"}</span>
            <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

