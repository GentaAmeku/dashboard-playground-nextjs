import type { z } from "zod";
import type { createTaskSchema, Task } from "@/lib/db/schema";
import { isErr, type Result } from "@/lib/result";

type TaskFormData = z.infer<typeof createTaskSchema>;

export function getFieldError(
  state: Result<Task> | null,
  fieldName: keyof TaskFormData,
): string | undefined {
  if (!state || !isErr(state)) return undefined;

  const error = state.error;
  if (error.type !== "VALIDATION_ERROR" || !error.issues) return undefined;

  const issue = error.issues.find(
    (issue: { path: (string | number)[]; message: string }) =>
      issue.path[0] === fieldName,
  );
  return issue?.message;
}
