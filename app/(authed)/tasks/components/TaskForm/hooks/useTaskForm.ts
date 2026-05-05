import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { createTaskSchema, PRIORITY, STATUS, type Task } from "@/lib/db/schema";

type TaskFormData = z.infer<typeof createTaskSchema>;

interface UseTaskFormProps {
  task?: Task;
}

const getDefaultValues = (task?: Task): TaskFormData => {
  return {
    name: task?.name ?? "",
    description: task?.description ?? null,
    status: task?.status ?? STATUS.PENDING,
    priority: task?.priority ?? PRIORITY.MEDIUM,
  };
};

export function useTaskForm({ task }: UseTaskFormProps = {}) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: getDefaultValues(task),
  });
  return form;
}
