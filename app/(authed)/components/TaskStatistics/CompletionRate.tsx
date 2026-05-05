import {
  getCompletedTaskCount,
  getTotalTaskCount,
} from "@/app/actions/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isErr } from "@/lib/result";

export default async function CompletionRate() {
  const [totalResult, completedResult] = await Promise.all([
    getTotalTaskCount(),
    getCompletedTaskCount(),
  ]);

  if (isErr(totalResult)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>完了率</CardTitle>
          <CardDescription>完了したタスクの割合</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-destructive text-sm">
            エラー: {totalResult.error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isErr(completedResult)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>完了率</CardTitle>
          <CardDescription>完了したタスクの割合</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-destructive text-sm">
            エラー: {completedResult.error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  const total = totalResult.value;
  const completed = completedResult.value;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>完了率</CardTitle>
        <CardDescription>完了したタスクの割合</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {rate}
          <span className="text-lg text-muted-foreground">%</span>
        </div>
      </CardContent>
    </Card>
  );
}
