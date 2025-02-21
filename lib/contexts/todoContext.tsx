'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { TaskType } from '../types/task'

import { CustomFieldType } from '../types/customField'

type TodoContextType = {
  todoList: TaskType[]
  setTodoList: (tasks: TaskType[]) => void
  addTask: (task: TaskType) => void
  updateTask: (taskId: string, updatedTask: TaskType) => void
  deleteTask: (taskId: string) => void
  isLoading: boolean
  customFields: CustomFieldType[]
  addCustomField: (field: CustomFieldType) => void
  removeCustomField: (fieldId: string) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)
const LOCAL_STORAGE_KEY = 'todo-list-tasks'
const CUSTOM_FIELDS_KEY = 'todo-list-custom-fields'

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<TaskType[]>([])
  const [customFields, setCustomFields] = useState<CustomFieldType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedFields = localStorage.getItem(CUSTOM_FIELDS_KEY)
    
    if (savedTasks) {
      setTodoList(JSON.parse(savedTasks))
    }
    if (savedFields) {
      setCustomFields(JSON.parse(savedFields))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList))
  }, [todoList])

  useEffect(() => {
    localStorage.setItem(CUSTOM_FIELDS_KEY, JSON.stringify(customFields))
  }, [customFields])

  const addTask = (task: TaskType) => {
    setTodoList([...todoList, task])
  }

  const updateTask = (taskId: string, updatedTask: TaskType) => {
    setTodoList(todoList.map(task => task.id === taskId ? updatedTask : task))
  }

  const deleteTask = (taskId: string) => {
    setTodoList(todoList.filter(task => task.id !== taskId))
  }

  const addCustomField = (field: CustomFieldType) => {
    setCustomFields([...customFields, field])
  }

  const removeCustomField = (fieldId: string) => {
    setCustomFields(customFields.filter(field => field.id !== fieldId))
    setTodoList(todoList.map(task => ({
      ...task,
      customFields: task.customFields?.filter(field => field.fieldId !== fieldId)
    })))
  }

  return (
    <TodoContext.Provider value={{ 
      todoList, 
      setTodoList, 
      addTask, 
      updateTask, 
      deleteTask, 
      isLoading,
      customFields,
      addCustomField,
      removeCustomField
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo() {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}
