'use client'
import { AddTaskModal } from "@/components/addTaskModal"
import { CustomFieldsEditor } from "@/components/customFieldsEditor"
import { TodoTable } from "@/components/todoTable"
import { useState } from "react"

export default function Home() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  return (
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
          <AddTaskModal
            isModalOpen={isTaskModalOpen}
            onOpenModal={setIsTaskModalOpen}
            onCloseModal={setIsTaskModalOpen}
          />
          <div className="flex justify-end mb-4">
            <CustomFieldsEditor />
          </div>
          <TodoTable />
        </div>
      </div>
  )
}
