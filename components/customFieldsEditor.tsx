'use client'

import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { useState } from "react"
import { useTodo } from "@/lib/contexts/todoContext"
import { CustomFieldType } from "@/lib/types/customField"
import { Trash2 } from "lucide-react"

export const CustomFieldsEditor = () => {
    const { customFields, addCustomField, removeCustomField } = useTodo()
    const [isOpen, setIsOpen] = useState(false)
    const [newField, setNewField] = useState<Partial<CustomFieldType>>({
        name: '',
        type: 'text'
    })

    const handleAddField = () => {
        if (newField.name && newField.type) {
            addCustomField({
                id: crypto.randomUUID(),
                name: newField.name,
                type: newField.type as 'text' | 'number' | 'checkbox'
            })
            setNewField({ name: '', type: 'text' })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Manage Custom Fields</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Custom Fields</DialogTitle>
                    <DialogDescription>
                        Add or remove custom fields for your tasks.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="Field name"
                            value={newField.name}
                            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                        />
                        <Select
                            value={newField.type}
                            onValueChange={(value) => setNewField({ ...newField, type: value })}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="checkbox">Checkbox</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={handleAddField}>Add</Button>
                    </div>
                    <div className="space-y-2">
                        {customFields.map((field) => (
                            <div key={field.id} className="flex items-center justify-between p-2 border rounded">
                                <div>
                                    <span className="font-medium">{field.name}</span>
                                    <span className="ml-2 text-sm text-gray-500">{field.type}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCustomField(field.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}