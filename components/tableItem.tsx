'use client'

import { Pencil, Trash2 } from "lucide-react"

import { TaskType } from "@/lib/types/task"
import { Button } from "./ui/button";
import { useTodo } from "@/lib/contexts/todoContext";
import { useState } from "react";
import { AddTaskModal } from "./addTaskModal";

type TableItemProps = {
  todo: TaskType;
};

export const TableItem = ({ todo}: TableItemProps) => {

    const { todoList, setTodoList } = useTodo();
    const [isItemEditable, setIsItemEditable] = useState(false)

    const onClickTaskEdit = () => {
        setIsItemEditable(true)
    }

    const onClickTaskDelete = () => {
        const newTaskList = todoList.filter((task) => task.id !== todo.id)
        setTodoList(newTaskList)
    }

  return (
    <tr key={todo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{todo.title}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{todo.priority}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{todo.status}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
            <div>
                <Button className="text-blue bg-transparent shadow-none" onClick={onClickTaskEdit}>
                    <Pencil color="gray" size={'18px'} />
                </Button>
                <Button className="text-orange bg-transparent shadow-none" onClick={onClickTaskDelete}>
                    <Trash2 color="crimson" size={'18px'} />
                </Button>
                <AddTaskModal isModalOpen={isItemEditable} onCloseModal={setIsItemEditable} onOpenModal={setIsItemEditable} todo={todo} hideTrigger />
            </div>
        </td>
    </tr>
  )
}