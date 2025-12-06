"use client";

import { ChevronDown } from "lucide-react";
import { STATUS_OPTIONS } from "@/app/tasks/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATUS_LABELS, type TaskStatus } from "@/lib/db/schema";

interface StatusFilterProps {
  selectedStatus: TaskStatus | null;
  onStatusChange: (status: TaskStatus | null) => void;
}

export default function StatusFilter({
  selectedStatus,
  onStatusChange,
}: StatusFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {selectedStatus ? STATUS_LABELS[selectedStatus] : "Status"}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onStatusChange(null)}>
          All
        </DropdownMenuItem>
        {STATUS_OPTIONS.map(({ value, label }) => (
          <DropdownMenuItem key={value} onClick={() => onStatusChange(value)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
