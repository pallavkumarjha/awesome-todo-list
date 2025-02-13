'use client';
import { AddTaskModal } from "@/components/addTaskModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const onSubmitTaskModal = () => {
    console.log('data submitted')
    setIsTaskModalOpen(false);
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
          <AddTaskModal
            isModalOpen={isTaskModalOpen}
            onOpenModal={setIsTaskModalOpen}
            onCloseModal={setIsTaskModalOpen}
            onSubmitModal={onSubmitTaskModal}
          />
        </div>
        
      </div>
  );
}
