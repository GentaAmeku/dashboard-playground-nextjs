import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import { getFieldError } from "@/app/tasks/components/TaskForm/utils/getFieldError";
import { PRIORITY_OPTIONS } from "@/app/tasks/constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { createTaskSchema, Task } from "@/lib/db/schema";
import type { Result } from "@/lib/result";

type TaskFormData = z.infer<typeof createTaskSchema>;

interface PriorityFieldProps {
  state: Result<Task> | null;
}

export function PriorityField({ state }: PriorityFieldProps) {
  const form = useFormContext<TaskFormData>();

  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <fieldset className="space-y-2">
            <FormLabel asChild>
              <legend>Priority</legend>
            </FormLabel>
            <input type="hidden" name="priority" value={field.value ?? ""} />
            <FormControl>
              <RadioGroup
                value={field.value ?? undefined}
                onValueChange={field.onChange}
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={option.value}
                      id={`priority-${option.value}`}
                    />
                    <label
                      htmlFor={`priority-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage>{getFieldError(state, "priority")}</FormMessage>
          </fieldset>
        </FormItem>
      )}
    />
  );
}
