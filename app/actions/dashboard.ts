"use server";

import { cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { taskService } from "@/lib/db/services/task-service";
import { isErr, ok, type Result } from "@/lib/result";

export const getTotalTaskCount = async (): Promise<Result<number>> => {
  "use cache";
  cacheTag(CACHE_TAGS.DASHBOARD);
  const result = await taskService.getTotalCount();
  if (isErr(result)) return result;
  return ok(result.value);
};

export const getStatusCounts = async (): Promise<
  Result<Record<string, number>>
> => {
  "use cache";
  cacheTag(CACHE_TAGS.DASHBOARD);
  const result = await taskService.getStatusCounts();
  if (isErr(result)) return result;
  return ok(result.value);
};

export const getPriorityCounts = async (): Promise<
  Result<Record<string, number>>
> => {
  "use cache";
  cacheTag(CACHE_TAGS.DASHBOARD);
  const result = await taskService.getPriorityCounts();
  if (isErr(result)) return result;
  return ok(result.value);
};

export const getCompletedTaskCount = async (): Promise<Result<number>> => {
  "use cache";
  cacheTag(CACHE_TAGS.DASHBOARD);
  const result = await taskService.getCompletedCount();
  if (isErr(result)) return result;
  return ok(result.value);
};
