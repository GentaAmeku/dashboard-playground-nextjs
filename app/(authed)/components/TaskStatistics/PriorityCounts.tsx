import { getPriorityCounts } from "@/app/actions/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRIORITY, PRIORITY_LABELS } from "@/lib/db/schema";
import { isErr } from "@/lib/result";

export default async function PriorityCounts() {
  const result = await getPriorityCounts();
  if (isErr(result)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>優先度別</CardTitle>
          <CardDescription>優先度ごとのタスク数</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-destructive text-sm">
            エラー: {result.error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>優先度別</CardTitle>
        <CardDescription>優先度ごとのタスク数</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.values(PRIORITY).map((priority) => (
            <div
              key={priority}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">
                {PRIORITY_LABELS[priority]}
              </span>
              <span className="font-semibold">
                {result.value[priority] ?? 0}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
