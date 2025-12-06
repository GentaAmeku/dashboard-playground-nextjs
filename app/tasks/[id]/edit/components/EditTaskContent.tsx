import { notFound } from "next/navigation";
import { EditTaskForm } from "./EditTaskForm";

interface EditTaskContentProps {
  params: Promise<{ id: string }>;
}

export async function EditTaskContent({ params }: EditTaskContentProps) {
  const { id } = await params;
  const taskId = Number.parseInt(id, 10);

  if (Number.isNaN(taskId)) notFound();

  return <EditTaskForm taskId={taskId} />;
}
