"use client";

import { Trash2 } from "lucide-react";
import { useDeleteTaskDialogStore } from "@/app/tasks/stores/delete-task-dialog-store";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DeleteMenuItemProps {
  taskId: number;
  taskName: string;
}

export function DeleteMenuItem({ taskId, taskName }: DeleteMenuItemProps) {
  const openDeleteDialog = useDeleteTaskDialogStore((state) => state.open);

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={() => openDeleteDialog(taskId, taskName)}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  );
}
