'use client';
import { TaskType } from "@/lib/types/task";
import { TableItem } from "./tableItem";
import { useTodo } from "@/lib/contexts/todoContext";
import { useState } from "react";

export const TodoTable = () => {
  const { todoList } = useTodo();
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [todos, setTodos] = useState(todoList)

  const sortData = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedList = [...todoList].sort((a, b) => {
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
    });
    setTodos(sortedList)
  };


  return (
    <div>
      <table className="w-full border-collapse bg-white dark:bg-black/[.1] shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => sortData('title')}>Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => sortData('priority')}>Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => sortData('status')}>Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => sortData('action')}>Action</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-black/[.1] divide-y divide-gray-200 dark:divide-gray-700">
          {todos.map((todo) => (
            <TableItem todo={todo} key={todo.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};