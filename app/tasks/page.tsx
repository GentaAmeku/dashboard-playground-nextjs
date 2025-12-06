import { Plus } from "lucide-react";
import Link from "next/link";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { DeleteTaskDialog } from "./components/DeleteTaskDialog";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList/container";
import TaskListSkeleton from "./components/TaskListSkeleton";

type TaskPageProps = {
  searchParams: Promise<SearchParams>;
};

export default function TasksPage({ searchParams }: TaskPageProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
        </div>
        <div className="flex items-center">
          <Button className="space-x-1" asChild>
            <Link href="/tasks/create">
              <span>Create</span> <Plus size={18} />
            </Link>
          </Button>
        </div>
      </div>
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskFilters />
        <TaskList searchParams={searchParams} />
      </Suspense>
      <DeleteTaskDialog />
    </div>
  );
}
