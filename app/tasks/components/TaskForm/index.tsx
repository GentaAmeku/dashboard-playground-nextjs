"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { Task } from "@/lib/db/schema";
import { isErr, type Result } from "@/lib/result";
import { DescriptionField } from "./components/DescriptionField";
import { NameField } from "./components/NameField";
import { PriorityField } from "./components/PriorityField";
import { StatusField } from "./components/StatusField";
import { useTaskForm } from "./hooks/useTaskForm";

interface TaskFormProps {
  task?: Task;
  action: (
    prevState: Result<Task> | null,
    formData: FormData,
  ) => Promise<Result<Task>>;
}

export function TaskForm({ task, action }: TaskFormProps) {
  const [state, formAction, pending] = useActionState<
    Result<Task> | null,
    FormData
  >(action, null);

  const form = useTaskForm({ task });

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        {task && <input type="hidden" name="id" value={task.id} />}
        <NameField state={state} />
        <DescriptionField state={state} />
        <StatusField state={state} />
        <PriorityField state={state} />

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/tasks">Cancel</Link>
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save changes"}
          </Button>
        </div>

        {state && isErr(state) && state.error.type !== "VALIDATION_ERROR" && (
          <p className="text-destructive text-sm mt-2">{state.error.message}</p>
        )}
      </form>
    </Form>
  );
}
