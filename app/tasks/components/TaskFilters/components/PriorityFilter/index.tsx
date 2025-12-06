"use client";

import { ChevronDown } from "lucide-react";
import { PRIORITY_OPTIONS } from "@/app/tasks/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRIORITY_LABELS, type TaskPriority } from "@/lib/db/schema";

interface PriorityFilterProps {
  selectedPriority: TaskPriority | null;
  onPriorityChange: (priority: TaskPriority | null) => void;
}

export default function PriorityFilter({
  selectedPriority,
  onPriorityChange,
}: PriorityFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {selectedPriority ? PRIORITY_LABELS[selectedPriority] : "Priority"}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onPriorityChange(null)}>
          All
        </DropdownMenuItem>
        {PRIORITY_OPTIONS.map(({ value, label }) => (
          <DropdownMenuItem key={value} onClick={() => onPriorityChange(value)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
