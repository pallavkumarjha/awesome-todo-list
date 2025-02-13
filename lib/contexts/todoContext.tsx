'use client';
import { createContext, useContext, useState } from 'react';
import { TaskType } from '../types/task';

type TodoContextType = {
  todoList: TaskType[];
  setTodoList: (tasks: TaskType[]) => void;
  addTask: (task: TaskType) => void;
  updateTask: (taskId: string, updatedTask: TaskType) => void;
  deleteTask: (taskId: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<TaskType[]>([]);

  const addTask = (task: TaskType) => {
    setTodoList([...todoList, task]);
  };

  const updateTask = (taskId: string, updatedTask: TaskType) => {
    setTodoList(todoList.map(task => task.id === taskId ? updatedTask : task));
  };

  const deleteTask = (taskId: string) => {
    setTodoList(todoList.filter(task => task.id !== taskId));
  };

  return (
    <TodoContext.Provider value={{ todoList, setTodoList, addTask, updateTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}