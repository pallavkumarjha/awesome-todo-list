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
      customFields: todo?.customFields || []
    })
    const { addTask, todoList, setTodoList, customFields } = useTodo()

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const data: TaskType = {
        id: todo?.id || "",
        title: formData.title,
        status: formData.status,
        priority: formData.priority,
        customFields: formData.customFields
      }
      if(todo) {
        updateTask(todo.id, data)
      } else {
        data.id = Math.random().toString()
        addTask(data)
      }
      onCloseModal(true)
      setFormData({ title: "", status: "", priority: "", customFields: [] })
    }

    const updateTask = (taskId: string, updatedTask: TaskType) => {
      setTodoList(todoList.map(task => task.id === taskId ? updatedTask : task))
    }

    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleCustomFieldChange = (fieldId: string, value: string | number | boolean) => {
      setFormData(prev => ({
        ...prev,
        customFields: [
          ...prev.customFields.filter(field => field.fieldId !== fieldId),
          { fieldId, value }
        ]
      }))
    }

    const getCustomFieldValue = (fieldId: string) => {
      return formData.customFields.find(field => field.fieldId === fieldId)?.value || ""
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
                {customFields.map(field => (
                  <div key={field.id}>
                    {field.type === 'text' && (
                      <Input
                        placeholder={field.name}
                        value={getCustomFieldValue(field.id) as string}
                        onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                      />
                    )}
                    {field.type === 'number' && (
                      <Input
                        type="number"
                        placeholder={field.name}
                        value={getCustomFieldValue(field.id) as string}
                        onChange={(e) => handleCustomFieldChange(field.id, Number(e.target.value))}
                      />
                    )}
                    {field.type === 'checkbox' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={field.id}
                          checked={Boolean(getCustomFieldValue(field.id))}
                          onChange={(e) => handleCustomFieldChange(field.id, e.target.checked)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={field.id}>{field.name}</label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <DialogFooter className="sm:justify-start">
                <Button type="submit" disabled={!formData.title || !formData.status || !formData.priority}>
                  { todo?.id ? 'Add Task' : 'Edit task'}
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