import { Clock, GraduationCap } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentTimetable } from "@/components/student-timetable"
import { Badge } from "@/components/ui/badge"

export default function StudentDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
      </div>

      <Tabs defaultValue="timetable" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timetable">My Timetable</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="timetable">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Timetable</CardTitle>
              <CardDescription>Your current class schedule</CardDescription>
              <Badge variant="outline" className="w-fit mt-2">
                Computer Science - Year 2
              </Badge>
            </CardHeader>
            <CardContent>
              <StudentTimetable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <h3 className="text-lg font-medium">Enrolled Courses</h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Introduction to Computer Science</CardTitle>
                <CardDescription>CS101</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>3 hours/week</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Prof. Johnson</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Calculus I</CardTitle>
                <CardDescription>MATH101</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>4 hours/week</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Prof. Smith</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Physics I</CardTitle>
                <CardDescription>PHY101</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>3 hours/week</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Prof. Williams</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

