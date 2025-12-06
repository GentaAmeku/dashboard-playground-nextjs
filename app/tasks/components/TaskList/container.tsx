import type { SearchParams } from "nuqs/server";
import { getTasks } from "@/app/tasks/actions/tasks";
import { searchParamsCache } from "@/app/tasks/lib/nuqs/searchParams";
import TaskListPresentational from "./presentational";

type TaskListContainerProps = {
  searchParams: Promise<SearchParams>;
};

export default async function TaskListContainer({
  searchParams,
}: TaskListContainerProps) {
  const query = await searchParams;
  const parsedQuery = searchParamsCache.parse(query);
  const result = await getTasks(parsedQuery);
  const data = result.ok ? result.value : [];
  return <TaskListPresentational tasks={data} />;
}
