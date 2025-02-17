'use client'
import { TableItem } from "./tableItem"
import { useTodo } from "@/lib/contexts/todoContext"
import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TODOS_COLUMNS } from "@/lib/constants"

export const TodoTable = () => {
  const { todoList } = useTodo()
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })
  const [todos, setTodos] = useState(todoList)
  const [filteredStatus, setFilteredStatus] = useState('')
  const [filteredPriority, setFilteredPriority] = useState('')
  const [filteredTask, setFilteredTask] = useState('')

  useEffect(() => {
    setTodos(todoList)
  }, [todoList])

  const sortData = (key: string) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })

    const sortedList = [...todos].sort((a, b) => {
      if (key === 'priority') {
        return direction === 'asc' 
          ? a.priority.localeCompare(b.priority)
          : b.priority.localeCompare(a.priority)
      } else if (key === 'status') {
        return direction === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status)
      } else if (key === 'title') {
        return direction === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      }
      return 0
    })
    setTodos(sortedList)
  }

  const handleInputChange = (key: string, value: string) => {
    if (key === 'title') {
      setFilteredTask(value)
      const filteredList = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(value.toLowerCase())
      )
      setTodos(filteredList)
    } else if (key === 'status') {
      setFilteredStatus(value)
      const filteredList = todoList.filter((todo) =>
        todo.status.toLowerCase().includes(value.toLowerCase())
      )
      setTodos(filteredList)
    } else if (key === 'priority') {
      setFilteredPriority(value)
      const filteredList = todoList.filter((todo) =>
        todo.priority.toLowerCase().includes(value.toLowerCase())
      )
      setTodos(filteredList)
    }
  }

  return (
    <div>
      <div className="my-4">
        <h2 className="mb-0">Filter list</h2>
        <div className="flex gap-4 items-center mt-4">
          <div className="flex-1">
            <Input value={filteredTask} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="Search by task name" />
          </div>
          <div className="flex-1">
            <Select value={filteredStatus} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Have you started?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={filteredPriority} onValueChange={(value) => handleInputChange("priority", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="What is the priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
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
      </div>
      <table className="w-full border-collapse bg-white dark:bg-black/[.1] shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {TODOS_COLUMNS.map((column) => (
              <th key={column.id} onClick={() => sortData(column.id)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer">
                <div className="flex items-center gap-1">
                  {column.title}
                  {sortConfig.key === column.id && (
                    <span className="inline-block">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-black/[.1] divide-y divide-gray-200 dark:divide-gray-700">
          {todos.map((todo) => (
            <TableItem todo={todo} key={todo.id} />
          ))}
          {todos.length === 0 && (
            <tr>
              <td colSpan={TODOS_COLUMNS.length} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
