import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CompletionRate from "./CompletionRate";
import PriorityCounts from "./PriorityCounts";
import StatusCounts from "./StatusCounts";
import TotalTaskCount from "./TotalTaskCount";

function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-32 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-16" />
      </CardContent>
    </Card>
  );
}

function StatusCountsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-32 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, index) => `skeleton-${index}`).map(
            (key) => (
              <div key={key} className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8" />
              </div>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function TaskStatistics() {
  return (
    // 参照レイアウトに合わせ、固定ブレークポイントではなく auto-fit の流動グリッドに。
    // 各カード最小 220px・gap 16px。中間幅では 3 列などに滑らかに追従する。
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      <Suspense fallback={<CardSkeleton />}>
        <TotalTaskCount />
      </Suspense>

      <Suspense fallback={<StatusCountsSkeleton />}>
        <StatusCounts />
      </Suspense>

      <Suspense fallback={<StatusCountsSkeleton />}>
        <PriorityCounts />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <CompletionRate />
      </Suspense>
    </div>
  );
}
