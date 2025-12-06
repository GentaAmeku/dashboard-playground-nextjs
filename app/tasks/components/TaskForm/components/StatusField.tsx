import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import { getFieldError } from "@/app/tasks/components/TaskForm/utils/getFieldError";
import { STATUS_OPTIONS } from "@/app/tasks/constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { createTaskSchema, Task } from "@/lib/db/schema";
import type { Result } from "@/lib/result";

type TaskFormData = z.infer<typeof createTaskSchema>;

interface StatusFieldProps {
  state: Result<Task> | null;
}

export function StatusField({ state }: StatusFieldProps) {
  const form = useFormContext<TaskFormData>();

  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <input type="hidden" name="status" value={field.value ?? ""} />
          <Select
            value={field.value ?? undefined}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage>{getFieldError(state, "status")}</FormMessage>
        </FormItem>
      )}
    />
  );
}
