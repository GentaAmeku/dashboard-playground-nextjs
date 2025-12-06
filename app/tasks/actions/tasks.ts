"use server";

import { cacheTag, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { inferParserType } from "nuqs/server";
import type { searchParamsParsers } from "@/app/tasks/lib/nuqs/searchParams";
import { CACHE_TAGS } from "@/lib/cache/tags";
import type { Task } from "@/lib/db/schema";
import { createTaskSchema } from "@/lib/db/schema";
import { taskService } from "@/lib/db/services/task-service";
import { validationError, zodErrorToAppError } from "@/lib/errors";
import { err, isErr, ok, type Result } from "@/lib/result";

const updateTasksCache = () => {
  updateTag(CACHE_TAGS.TASKS);
  updateTag(CACHE_TAGS.DASHBOARD);
};

export const getTasks = async (
  query: inferParserType<typeof searchParamsParsers>,
) => {
  "use cache";
  cacheTag(CACHE_TAGS.TASKS);
  const result = await taskService.getTasksByQuery(query);
  if (isErr(result)) return result;
  return ok(result.value);
};

export const getTaskById = async (id: number): Promise<Result<Task>> => {
  "use cache";
  cacheTag(CACHE_TAGS.TASKS);
  const result = await taskService.getTask(id);
  if (isErr(result)) return result;
  return ok(result.value);
};

export const createTask = async (
  _prevState: Result<Task> | null,
  formData: FormData,
): Promise<Result<Task>> => {
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string | null,
    status: formData.get("status") as string,
    priority: formData.get("priority") as string,
  };

  const parseResult = createTaskSchema.safeParse(data);

  if (!parseResult.success) {
    return err(zodErrorToAppError(parseResult.error));
  }

  const taskResult = await taskService.createTask(parseResult.data);
  if (isErr(taskResult)) {
    return err(taskResult.error);
  }

  updateTasksCache();
  redirect("/tasks");
};

export const updateTask = async (
  _prevState: Result<Task> | null,
  formData: FormData,
): Promise<Result<Task>> => {
  const idStr = formData.get("id") as string;
  const id = Number.parseInt(idStr, 10);

  if (Number.isNaN(id)) {
    return err(validationError("Invalid task ID", ["id"]));
  }

  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string | null,
    status: formData.get("status") as string,
    priority: formData.get("priority") as string,
  };

  const parseResult = createTaskSchema.safeParse(data);

  if (!parseResult.success) {
    return err(zodErrorToAppError(parseResult.error));
  }

  const taskResult = await taskService.updateTask(id, parseResult.data);
  if (isErr(taskResult)) {
    return err(taskResult.error);
  }

  updateTasksCache();
  redirect("/tasks");
};

export const deleteTask = async (id: number) => {
  const result = await taskService.deleteTask(id);
  if (isErr(result)) {
    return err(result.error);
  }
  updateTasksCache();
};
