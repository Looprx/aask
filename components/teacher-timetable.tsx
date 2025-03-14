"use client"

import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { AlertCircle, Info } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

// Initial timetable data
const initialTimetable = {
  Monday: [
    { id: "mon-1", course: "CS101", room: "A101", time: "9:00 AM" },
    { id: "mon-2", course: "CS201", room: "B202", time: "1:00 PM" },
  ],
  Tuesday: [{ id: "tue-1", course: "CS301", room: "C303", time: "10:00 AM" }],
  Wednesday: [{ id: "wed-1", course: "CS101", room: "A101", time: "9:00 AM" }],
  Thursday: [{ id: "thu-1", course: "CS201", room: "B202", time: "1:00 PM" }],
  Friday: [{ id: "fri-1", course: "CS301", room: "C303", time: "10:00 AM" }],
}

export function TeacherTimetable() {
  const [timetable, setTimetable] = useState(initialTimetable)
  const [conflicts, setConflicts] = useState<string[]>([])
  const [floatingMode, setFloatingMode] = useState(false)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same day
      const day = source.droppableId
      const items = Array.from(timetable[day as keyof typeof timetable])
      const [reorderedItem] = items.splice(source.index, 1)

      // Update the time based on destination index
      const newItem = {
        ...reorderedItem,
        time: timeSlots[destination.index],
      }

      items.splice(destination.index, 0, newItem)

      // Check for conflicts
      const newConflicts = checkForConflicts(items, day)

      setTimetable({
        ...timetable,
        [day]: items,
      })

      if (newConflicts.length > 0) {
        setConflicts(newConflicts)
      }
    } else {
      // Moving between days
      const sourceDay = source.droppableId
      const destDay = destination.droppableId
      const sourceItems = Array.from(timetable[sourceDay as keyof typeof timetable])
      const destItems = Array.from(timetable[destDay as keyof typeof timetable])
      const [movedItem] = sourceItems.splice(source.index, 1)

      // Update the time based on destination index
      const newItem = {
        ...movedItem,
        time: timeSlots[destination.index],
      }

      destItems.splice(destination.index, 0, newItem)

      // Check for conflicts
      const newConflicts = checkForConflicts(destItems, destDay)

      setTimetable({
        ...timetable,
        [sourceDay]: sourceItems,
        [destDay]: destItems,
      })

      if (newConflicts.length > 0) {
        setConflicts(newConflicts)
      }
    }
  }

  const checkForConflicts = (items: any[], day: string) => {
    const conflicts: string[] = []
    const timeMap = new Map()

    items.forEach((item) => {
      if (timeMap.has(item.time)) {
        conflicts.push(`Conflict on ${day} at ${item.time}: ${timeMap.get(item.time)} and ${item.course}`)
      } else {
        timeMap.set(item.time, item.course)
      }
    })

    return conflicts
  }

  const toggleFloatingMode = () => {
    setFloatingMode(!floatingMode)
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">Drag and drop classes to rearrange your timetable</div>
        <button
          onClick={toggleFloatingMode}
          className="text-sm px-3 py-1 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          {floatingMode ? "Exit Floating Mode" : "Enter Floating Mode"}
        </button>
      </div>

      {conflicts.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {conflicts.map((conflict, index) => (
              <div key={index}>{conflict}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
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
              <Droppable key={day} droppableId={day}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {timeSlots.map((time, index) => {
                      const classForThisSlot = timetable[day as keyof typeof timetable].find((cls) => cls.time === time)

                      return (
                        <div key={`${day}-${time}`} className="border rounded p-2 h-20">
                          {classForThisSlot ? (
                            <Draggable draggableId={classForThisSlot.id} index={index}>
                              {(provided) => (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="bg-primary/10 rounded p-1 h-full flex flex-col justify-between cursor-move"
                                      >
                                        <div className="font-medium">{classForThisSlot.course}</div>
                                        <div className="text-xs text-muted-foreground">
                                          Room: {classForThisSlot.room}
                                        </div>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Drag to reschedule</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </Draggable>
                          ) : null}
                        </div>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          {floatingMode && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
              <Info className="h-4 w-4" />
            </div>
          )}
        </div>
      </DragDropContext>
    </div>
  )
}

