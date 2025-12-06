import { notFound } from "next/navigation";
import { getTaskById, updateTask } from "@/app/tasks/actions/tasks";
import { TaskForm } from "@/app/tasks/components/TaskForm";
import { isErr } from "@/lib/result";

interface EditTaskFormProps {
  taskId: number;
}

export async function EditTaskForm({ taskId }: EditTaskFormProps) {
  const taskResult = await getTaskById(taskId);
  if (isErr(taskResult)) {
    notFound();
  }

  const task = taskResult.value;

  return <TaskForm task={task} action={updateTask} />;
}
