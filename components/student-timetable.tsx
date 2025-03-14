"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export function StudentTimetable() {
  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ]
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const [floatingMode, setFloatingMode] = useState(false)

  // Sample timetable data for a student
  const timetable = {
    Monday: [
      { course: "CS101", room: "A101", time: "9:00 AM", teacher: "Prof. Johnson" },
      { course: "MATH101", room: "M105", time: "1:00 PM", teacher: "Prof. Smith" },
    ],
    Tuesday: [{ course: "PHY101", room: "P202", time: "10:00 AM", teacher: "Prof. Williams" }],
    Wednesday: [
      { course: "CS101", room: "A101", time: "9:00 AM", teacher: "Prof. Johnson" },
      { course: "ENG101", room: "E105", time: "2:00 PM", teacher: "Prof. Davis" },
    ],
    Thursday: [{ course: "MATH101", room: "M105", time: "1:00 PM", teacher: "Prof. Smith" }],
    Friday: [{ course: "PHY101", room: "P202", time: "10:00 AM", teacher: "Prof. Williams" }],
  }

  const toggleFloatingMode = () => {
    setFloatingMode(!floatingMode)
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleFloatingMode}
          className="text-sm px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          {floatingMode ? "Exit Floating Mode" : "View as Floating Timetable"}
        </button>
      </div>

      <div
        className={`min-w-[800px] ${floatingMode ? "fixed top-20 right-4 z-50 bg-white dark:bg-gray-950 p-4 rounded-lg shadow-lg border" : ""}`}
      >
        <div className="grid grid-cols-6 gap-2 font-medium">
          <div className="p-2 text-center">Time</div>
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-6 gap-2 mt-2">
          <div className="space-y-2">
            {timeSlots.map((time) => (
              <div key={time} className="border rounded p-2 text-center h-20 flex items-center justify-center">
                {time}
              </div>
            ))}
          </div>

          {weekDays.map((day) => (
            <div key={day} className="space-y-2">
              {timeSlots.map((time) => {
                const classForThisSlot = timetable[day as keyof typeof timetable]?.find((cls) => cls.time === time)

                return (
                  <div key={`${day}-${time}`} className="border rounded p-2 h-20">
                    {classForThisSlot ? (
                      <div className="bg-primary/10 rounded p-1 h-full flex flex-col justify-between">
                        <div className="font-medium">{classForThisSlot.course}</div>
                        <div className="text-xs">Room: {classForThisSlot.room}</div>
                        <div className="text-xs text-muted-foreground">{classForThisSlot.teacher}</div>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {floatingMode && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
            <Info className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  )
}

