"use server";

import { cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { taskService } from "@/lib/db/services/task-service";
import type { Result } from "@/lib/result";

export const getTotalTaskCount = async (): Promise<Result<number>> => {
  "use cache";
  cacheTag(CACHE_TAGS.DASHBOARD);
  const result = await taskService.getTotalCount();
  return result;
};

export const getStatusCounts = async (): Promise<
  Result<Record<string, number>>
> => {
  "use cache";
  cacheTag(CACHE_TAGS.DASHBOARD);
  const result = await taskService.getStatusCounts();
  return result;
};

export const getPriorityCounts = async (): Promise<
  Result<Record<string, number>>
> => {
  "use cache";
  cacheTag(CACHE_TAGS.DASHBOARD);
  const result = await taskService.getPriorityCounts();
  return result;
};

export const getCompletedTaskCount = async (): Promise<Result<number>> => {
  "use cache";
  cacheTag(CACHE_TAGS.DASHBOARD);
  const result = await taskService.getCompletedCount();
  return result;
};
