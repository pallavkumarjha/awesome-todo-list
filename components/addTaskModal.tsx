import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"

  type AddTaskModalProps = {
    isModalOpen: boolean,
    onCloseModal: (isOpen: boolean) => void,
    onSubmitModal: () => void,
    onOpenModal: (isOpen: boolean) => void,
  }

  export const AddTaskModal = ({ isModalOpen, onCloseModal, onOpenModal, onSubmitModal }: AddTaskModalProps) => {

    return (
      <Dialog open={isModalOpen}>
        <DialogTrigger asChild>
          <Button className="text-white" onClick={() => onOpenModal(true)}>Add task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Task</DialogTitle>
            <DialogDescription>Add a new task to your list</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button onClick={() => onCloseModal(false)} type="button" variant="secondary">
                Close
                </Button>
            </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }