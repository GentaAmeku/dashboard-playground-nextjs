import { createTask } from "@/app/tasks/actions/tasks";
import { TaskForm } from "@/app/tasks/components/TaskForm";

export default function CreateTaskPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Create Task</h2>
        <p className="text-muted-foreground">
          Add a new task by providing necessary info. Click save when you're
          done.
        </p>
      </div>
      <TaskForm action={createTask} />
    </div>
  );
}
