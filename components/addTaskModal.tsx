'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"
import { TaskType } from "@/lib/types/task"
import { useTodo } from "@/lib/contexts/todoContext"

  type AddTaskModalProps = {
    isModalOpen: boolean,
    onCloseModal: (isOpen: boolean) => void,
    onOpenModal: (isOpen: boolean) => void,
    todo?: TaskType,
    hideTrigger?: boolean,
  }

  export const AddTaskModal = ({ isModalOpen, onCloseModal, onOpenModal, todo, hideTrigger }: AddTaskModalProps) => {
    const [formData, setFormData] = useState({
      title: todo?.title || "",
      status: todo?.status || "",
      priority: todo?.priority || "",
    })
    const { addTask, todoList, setTodoList } = useTodo()

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const data: TaskType = {
        id: todo?.id || "",
        title: formData.title,
        status: formData.status,
        priority: formData.priority
      }
      if(todo) {
        updateTask(todo.id, data)
      } else {
        data.id = Math.random().toString()
        addTask(data)
      }
      onCloseModal(true)
      setFormData({ title: "", status: "", priority: "" })
    }

    const updateTask = (taskId: string, updatedTask: TaskType) => {
      setTodoList(todoList.map(task => task.id === taskId ? updatedTask : task))
    }

    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
      <Dialog open={isModalOpen}>
        {!hideTrigger && (
          <DialogTrigger asChild>
            <Button className="text-white" onClick={() => onOpenModal(true)}>Add task</Button>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Task</DialogTitle>
            <DialogDescription>Add a new task to your list</DialogDescription>
          </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <Input 
                  placeholder="Describe your task" 
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
                <div>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Have you started?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup defaultValue={todo?.status}>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="What is the priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup defaultValue={todo?.priority}>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button type="submit" disabled={!formData.title || !formData.status || !formData.priority}>
                  Add Task
                </Button>
                <DialogClose asChild>
                  <Button onClick={() => onCloseModal(false)} type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    )
  }