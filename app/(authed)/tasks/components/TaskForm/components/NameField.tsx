import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { createTaskSchema, Task } from "@/lib/db/schema";
import type { Result } from "@/lib/result";
import { getFieldError } from "../utils/getFieldError";

type TaskFormData = z.infer<typeof createTaskSchema>;

interface NameFieldProps {
  state: Result<Task> | null;
}

export function NameField({ state }: NameFieldProps) {
  const form = useFormContext<TaskFormData>();

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              {...field}
              name="name"
              value={field.value ?? ""}
              placeholder="Enter a title"
            />
          </FormControl>
          <FormMessage>{getFieldError(state, "name")}</FormMessage>
        </FormItem>
      )}
    />
  );
}
