import { Skeleton } from "@/components/ui/skeleton";

export default function TaskListSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-10 flex-1 max-w-sm" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="grid grid-cols-[1fr_120px_120px_40px] gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
        <div>Task</div>
        <div>Status</div>
        <div>Priority</div>
        <div></div>
      </div>
      <ul className="divide-y divide-border">
        {Array.from({ length: 5 }, (_, i) => i).map((num) => (
          <li key={num} className="py-4">
            <div className="grid grid-cols-[1fr_120px_120px_40px] gap-4 items-center px-4">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="flex items-center justify-end">
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
