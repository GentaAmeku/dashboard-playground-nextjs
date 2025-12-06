"use client";

import { debounce, useQueryStates } from "nuqs";
import { searchParamsParsers } from "@/app/tasks/lib/nuqs/searchParams";
import type { TaskPriority, TaskStatus } from "@/lib/db/schema";
import PriorityFilter from "./components/PriorityFilter";
import SearchFilter from "./components/SearchFilter";
import StatusFilter from "./components/StatusFilter";

export default function TaskFilters() {
  const [query, setQuery] = useQueryStates(searchParamsParsers);
  const handleSearchChange = (value: string) => {
    setQuery({ name: value }, { limitUrlUpdates: debounce(500) });
  };
  const handleStatusChange = (value: TaskStatus | null) => {
    setQuery({ status: value });
  };
  const handlePriorityChange = (value: TaskPriority | null) => {
    setQuery({ priority: value });
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <SearchFilter
        searchValue={query.name}
        onSearchChange={handleSearchChange}
      />
      <StatusFilter
        selectedStatus={query.status}
        onStatusChange={handleStatusChange}
      />
      <PriorityFilter
        selectedPriority={query.priority}
        onPriorityChange={handlePriorityChange}
      />
    </div>
  );
}
