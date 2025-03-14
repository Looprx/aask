"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  GraduationCap,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
  Users,
  UserPlus,
  Mail,
  Phone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeacherTimetable } from "@/components/teacher-timetable"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Introduction to Computer Science", code: "CS101", hours: 3, department: "Computer Science" },
    { id: 2, name: "Data Structures", code: "CS201", hours: 4, department: "Computer Science" },
    { id: 3, name: "Database Systems", code: "CS301", hours: 3, department: "Computer Science" },
  ])

  const [departments, setDepartments] = useState([
    { id: "CS-001", name: "Computer Science", courses: 12, teachers: 8 },
    { id: "MATH-002", name: "Mathematics", courses: 10, teachers: 6 },
    { id: "PHY-003", name: "Physics", courses: 8, teachers: 5 },
  ])

  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    hours: "",
    department: "",
  })

  const [newDepartment, setNewDepartment] = useState({
    name: "",
    id: "",
  })

  const [editingCourse, setEditingCourse] = useState<number | null>(null)
  const [editingDepartment, setEditingDepartment] = useState<string | null>(null)
  const [editedCourse, setEditedCourse] = useState({
    name: "",
    code: "",
    hours: "",
    department: "",
  })
  const [editedDepartment, setEditedDepartment] = useState({
    name: "",
    id: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  const [teachers, setTeachers] = useState([
    {
      id: "T001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "123-456-7890",
      department: "Computer Science",
      subjects: ["CS101", "CS201"],
    },
    {
      id: "T002",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "234-567-8901",
      department: "Mathematics",
      subjects: ["MATH101", "MATH201"],
    },
    {
      id: "T003",
      name: "Michael Williams",
      email: "m.williams@example.com",
      phone: "345-678-9012",
      department: "Physics",
      subjects: ["PHY101"],
    },
  ])

  const [students, setStudents] = useState([
    {
      id: "S001",
      name: "Alex Johnson",
      email: "alex.j@example.com",
      phone: "456-789-0123",
      program: "Computer Science",
      year: 2,
    },
    {
      id: "S002",
      name: "Emma Davis",
      email: "emma.d@example.com",
      phone: "567-890-1234",
      program: "Mathematics",
      year: 1,
    },
    {
      id: "S003",
      name: "Ryan Miller",
      email: "ryan.m@example.com",
      phone: "678-901-2345",
      program: "Physics",
      year: 3,
    },
  ])

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subjects: [],
  })

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    year: "",
  })

  const [editingTeacher, setEditingTeacher] = useState<string | null>(null)
  const [editingStudent, setEditingStudent] = useState<string | null>(null)

  const [editedTeacher, setEditedTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subjects: [] as string[],
  })

  const [editedStudent, setEditedStudent] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    year: "",
  })

  const handleAddCourse = () => {
    const courseToAdd = {
      id: courses.length + 1,
      name: newCourse.name,
      code: newCourse.code,
      hours: Number.parseInt(newCourse.hours),
      department: newCourse.department,
    }

    setCourses([...courses, courseToAdd])
    setNewCourse({ name: "", code: "", hours: "", department: "" })
  }

  const handleAddDepartment = () => {
    const departmentToAdd = {
      id: newDepartment.id,
      name: newDepartment.name,
      courses: 0,
      teachers: 0,
    }

    setDepartments([...departments, departmentToAdd])
    setNewDepartment({ name: "", id: "" })
  }

  const startEditingCourse = (course: any) => {
    setEditingCourse(course.id)
    setEditedCourse({
      name: course.name,
      code: course.code,
      hours: course.hours.toString(),
      department: course.department,
    })
  }

  const startEditingDepartment = (department: any) => {
    setEditingDepartment(department.id)
    setEditedDepartment({
      name: department.name,
      id: department.id,
    })
  }

  const saveEditedCourse = (id: number) => {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              name: editedCourse.name,
              code: editedCourse.code,
              hours: Number.parseInt(editedCourse.hours),
              department: editedCourse.department,
            }
          : course,
      ),
    )
    setEditingCourse(null)
  }

  const saveEditedDepartment = (id: string) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id
          ? {
              ...dept,
              name: editedDepartment.name,
              id: editedDepartment.id,
            }
          : dept,
      ),
    )
    setEditingDepartment(null)
  }

  const deleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const deleteDepartment = (id: string) => {
    setDepartments(departments.filter((dept) => dept.id !== id))
  }

  const generateTimetable = () => {
    setIsGenerating(true)

    // Simulate timetable generation
    setTimeout(() => {
      setIsGenerating(false)
      setGenerationComplete(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setGenerationComplete(false)
      }, 3000)
    }, 2000)
  }

  const handleAddTeacher = () => {
    const teacherToAdd = {
      id: `T${(teachers.length + 1).toString().padStart(3, "0")}`,
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone,
      department: newTeacher.department,
      subjects: newTeacher.subjects,
    }

    setTeachers([...teachers, teacherToAdd])
    setNewTeacher({ name: "", email: "", phone: "", department: "", subjects: [] })
  }

  const handleAddStudent = () => {
    const studentToAdd = {
      id: `S${(students.length + 1).toString().padStart(3, "0")}`,
      name: newStudent.name,
      email: newStudent.email,
      phone: newStudent.phone,
      program: newStudent.program,
      year: Number.parseInt(newStudent.year),
    }

    setStudents([...students, studentToAdd])
    setNewStudent({ name: "", email: "", phone: "", program: "", year: "" })
  }

  const startEditingTeacher = (teacher: any) => {
    setEditingTeacher(teacher.id)
    setEditedTeacher({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      subjects: [...teacher.subjects],
    })
  }

  const startEditingStudent = (student: any) => {
    setEditingStudent(student.id)
    setEditedStudent({
      name: student.name,
      email: student.email,
      phone: student.phone,
      program: student.program,
      year: student.year.toString(),
    })
  }

  const saveEditedTeacher = (id: string) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === id
          ? {
              ...teacher,
              name: editedTeacher.name,
              email: editedTeacher.email,
              phone: editedTeacher.phone,
              department: editedTeacher.department,
              subjects: editedTeacher.subjects,
            }
          : teacher,
      ),
    )
    setEditingTeacher(null)
  }

  const saveEditedStudent = (id: string) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              name: editedStudent.name,
              email: editedStudent.email,
              phone: editedStudent.phone,
              program: editedStudent.program,
              year: Number.parseInt(editedStudent.year),
            }
          : student,
      ),
    )
    setEditingStudent(null)
  }

  const deleteTeacher = (id: string) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id))
  }

  const deleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
      </div>

      {generationComplete && (
        <Alert className="bg-green-50 border-green-200">
          <Calendar className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Timetable has been successfully generated and is now available for viewing.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Courses</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Course
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>Enter the details for the new course.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="course-name">Course Name</Label>
                    <Input
                      id="course-name"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="course-code">Course Code</Label>
                    <Input
                      id="course-code"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="course-hours">Weekly Hours</Label>
                    <Input
                      id="course-hours"
                      type="number"
                      value={newCourse.hours}
                      onChange={(e) => setNewCourse({ ...newCourse, hours: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="course-dept">Department</Label>
                    <Select onValueChange={(value) => setNewCourse({ ...newCourse, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddCourse}>Add Course</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="relative">
                {editingCourse === course.id ? (
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edit-name-${course.id}`}>Course Name</Label>
                      <Input
                        id={`edit-name-${course.id}`}
                        value={editedCourse.name}
                        onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-code-${course.id}`}>Course Code</Label>
                      <Input
                        id={`edit-code-${course.id}`}
                        value={editedCourse.code}
                        onChange={(e) => setEditedCourse({ ...editedCourse, code: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-hours-${course.id}`}>Weekly Hours</Label>
                      <Input
                        id={`edit-hours-${course.id}`}
                        type="number"
                        value={editedCourse.hours}
                        onChange={(e) => setEditedCourse({ ...editedCourse, hours: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-dept-${course.id}`}>Department</Label>
                      <Select
                        defaultValue={editedCourse.department}
                        onValueChange={(value) => setEditedCourse({ ...editedCourse, department: value })}
                      >
                        <SelectTrigger id={`edit-dept-${course.id}`}>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => setEditingCourse(null)}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button size="sm" onClick={() => saveEditedCourse(course.id)}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.code}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{course.hours} hours/week</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{course.department}</span>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => startEditingCourse(course)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteCourse(course.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Departments</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>Enter the details for the new department.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="dept-name">Department Name</Label>
                    <Input
                      id="dept-name"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dept-id">Department ID</Label>
                    <Input
                      id="dept-id"
                      value={newDepartment.id}
                      onChange={(e) => setNewDepartment({ ...newDepartment, id: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddDepartment}>Add Department</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <Card key={department.id} className="relative">
                {editingDepartment === department.id ? (
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edit-dept-name-${department.id}`}>Department Name</Label>
                      <Input
                        id={`edit-dept-name-${department.id}`}
                        value={editedDepartment.name}
                        onChange={(e) => setEditedDepartment({ ...editedDepartment, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-dept-id-${department.id}`}>Department ID</Label>
                      <Input
                        id={`edit-dept-id-${department.id}`}
                        value={editedDepartment.id}
                        onChange={(e) => setEditedDepartment({ ...editedDepartment, id: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => setEditingDepartment(null)}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button size="sm" onClick={() => saveEditedDepartment(department.id)}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle>{department.name}</CardTitle>
                      <CardDescription>Department ID: {department.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <p>Courses: {department.courses}</p>
                        <p>Teachers: {department.teachers}</p>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => startEditingDepartment(department)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteDepartment(department.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Teachers</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>Enter the details for the new teacher.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="teacher-name">Full Name</Label>
                    <Input
                      id="teacher-name"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teacher-phone">Phone</Label>
                    <Input
                      id="teacher-phone"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teacher-dept">Department</Label>
                    <Select onValueChange={(value) => setNewTeacher({ ...newTeacher, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teacher-subjects">Subjects (comma separated)</Label>
                    <Input
                      id="teacher-subjects"
                      placeholder="CS101, CS201"
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, subjects: e.target.value.split(",").map((s) => s.trim()) })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddTeacher}>Add Teacher</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <Card key={teacher.id} className="relative">
                {editingTeacher === teacher.id ? (
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edit-teacher-name-${teacher.id}`}>Full Name</Label>
                      <Input
                        id={`edit-teacher-name-${teacher.id}`}
                        value={editedTeacher.name}
                        onChange={(e) => setEditedTeacher({ ...editedTeacher, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-teacher-email-${teacher.id}`}>Email</Label>
                      <Input
                        id={`edit-teacher-email-${teacher.id}`}
                        type="email"
                        value={editedTeacher.email}
                        onChange={(e) => setEditedTeacher({ ...editedTeacher, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-teacher-phone-${teacher.id}`}>Phone</Label>
                      <Input
                        id={`edit-teacher-phone-${teacher.id}`}
                        value={editedTeacher.phone}
                        onChange={(e) => setEditedTeacher({ ...editedTeacher, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-teacher-dept-${teacher.id}`}>Department</Label>
                      <Select
                        defaultValue={editedTeacher.department}
                        onValueChange={(value) => setEditedTeacher({ ...editedTeacher, department: value })}
                      >
                        <SelectTrigger id={`edit-teacher-dept-${teacher.id}`}>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-teacher-subjects-${teacher.id}`}>Subjects (comma separated)</Label>
                      <Input
                        id={`edit-teacher-subjects-${teacher.id}`}
                        value={editedTeacher.subjects.join(", ")}
                        onChange={(e) =>
                          setEditedTeacher({
                            ...editedTeacher,
                            subjects: e.target.value.split(",").map((s) => s.trim()),
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => setEditingTeacher(null)}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button size="sm" onClick={() => saveEditedTeacher(teacher.id)}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle>{teacher.name}</CardTitle>
                      <CardDescription>ID: {teacher.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{teacher.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{teacher.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{teacher.department}</span>
                        </div>
                        <div>
                          <span className="font-medium">Subjects:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {teacher.subjects.map((subject, index) => (
                              <Badge key={index} variant="outline">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => startEditingTeacher(teacher)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteTeacher(teacher.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Students</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Enter the details for the new student.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-phone">Phone</Label>
                    <Input
                      id="student-phone"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-program">Program/Department</Label>
                    <Select onValueChange={(value) => setNewStudent({ ...newStudent, program: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-year">Year</Label>
                    <Select onValueChange={(value) => setNewStudent({ ...newStudent, year: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Year 1</SelectItem>
                        <SelectItem value="2">Year 2</SelectItem>
                        <SelectItem value="3">Year 3</SelectItem>
                        <SelectItem value="4">Year 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddStudent}>Add Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <Card key={student.id} className="relative">
                {editingStudent === student.id ? (
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edit-student-name-${student.id}`}>Full Name</Label>
                      <Input
                        id={`edit-student-name-${student.id}`}
                        value={editedStudent.name}
                        onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-student-email-${student.id}`}>Email</Label>
                      <Input
                        id={`edit-student-email-${student.id}`}
                        type="email"
                        value={editedStudent.email}
                        onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-student-phone-${student.id}`}>Phone</Label>
                      <Input
                        id={`edit-student-phone-${student.id}`}
                        value={editedStudent.phone}
                        onChange={(e) => setEditedStudent({ ...editedStudent, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-student-program-${student.id}`}>Program/Department</Label>
                      <Select
                        defaultValue={editedStudent.program}
                        onValueChange={(value) => setEditedStudent({ ...editedStudent, program: value })}
                      >
                        <SelectTrigger id={`edit-student-program-${student.id}`}>
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 mt-2">
                      <Label htmlFor={`edit-student-year-${student.id}`}>Year</Label>
                      <Select
                        defaultValue={editedStudent.year}
                        onValueChange={(value) => setEditedStudent({ ...editedStudent, year: value })}
                      >
                        <SelectTrigger id={`edit-student-year-${student.id}`}>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Year 1</SelectItem>
                          <SelectItem value="2">Year 2</SelectItem>
                          <SelectItem value="3">Year 3</SelectItem>
                          <SelectItem value="4">Year 4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => setEditingStudent(null)}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button size="sm" onClick={() => saveEditedStudent(student.id)}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle>{student.name}</CardTitle>
                      <CardDescription>ID: {student.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{student.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{student.program}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Year {student.year}</span>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => startEditingStudent(student)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteStudent(student.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timetable">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Weekly Timetable</CardTitle>
                <CardDescription>Your current teaching schedule</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select onValueChange={(value) => setSelectedDepartment(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={generateTimetable} disabled={isGenerating || !selectedDepartment}>
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Timetable
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedDepartment ? (
                <div className="mb-4">
                  <Badge variant="outline" className="mb-2">
                    {departments.find((d) => d.id === selectedDepartment)?.name}
                  </Badge>
                  <TeacherTimetable />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Timetable Selected</h3>
                  <p className="text-muted-foreground max-w-md">
                    Please select a department from the dropdown above to view or generate a timetable.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

