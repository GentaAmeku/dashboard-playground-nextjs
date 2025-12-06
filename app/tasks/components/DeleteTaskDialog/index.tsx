"use client";

import { deleteTask } from "@/app/tasks/actions/tasks";
import { useDeleteTaskDialogStore } from "@/app/tasks/stores/delete-task-dialog-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DeleteTaskDialog() {
  const { isOpen, taskId, taskName, close } = useDeleteTaskDialogStore();

  const handleDelete = async () => {
    if (taskId === null) return;
    await deleteTask(taskId);
    close();
  };

  if (taskId === null || taskName === null) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this task: {taskName} ?</DialogTitle>
          <DialogDescription>
            You are about to delete a task with the ID TASK-{taskId}. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
