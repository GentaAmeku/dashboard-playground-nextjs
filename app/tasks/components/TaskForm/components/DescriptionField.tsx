import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { createTaskSchema, Task } from "@/lib/db/schema";
import type { Result } from "@/lib/result";
import { getFieldError } from "../utils/getFieldError";

type TaskFormData = z.infer<typeof createTaskSchema>;

interface DescriptionFieldProps {
  state: Result<Task> | null;
}

export function DescriptionField({ state }: DescriptionFieldProps) {
  const form = useFormContext<TaskFormData>();

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              name="description"
              value={field.value ?? ""}
              placeholder="Enter a description (optional)"
              rows={4}
            />
          </FormControl>
          <FormMessage>{getFieldError(state, "description")}</FormMessage>
        </FormItem>
      )}
    />
  );
}

