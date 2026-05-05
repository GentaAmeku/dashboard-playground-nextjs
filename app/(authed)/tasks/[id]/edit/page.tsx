import { Suspense } from "react";
import { EditTaskContent } from "./components/EditTaskContent";
import { EditTaskFormSkeleton } from "./components/EditTaskFormSkeleton";

interface EditTaskPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTaskPage({ params }: EditTaskPageProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Edit Task</h2>
        <p className="text-muted-foreground">
          Update task information. Click save when you're done.
        </p>
      </div>
      <Suspense fallback={<EditTaskFormSkeleton />}>
        <EditTaskContent params={params} />
      </Suspense>
    </div>
  );
}
