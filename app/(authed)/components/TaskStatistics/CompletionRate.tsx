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
        {/* 参照の bigNum スタイル。% は 1 段小さく・ミュート・weight 500 */}
        <div className="font-heading text-3xl font-bold leading-none tracking-[-0.02em]">
          {rate}
          <span className="text-lg font-medium text-muted-foreground">%</span>
        </div>
        {/* 完了率を可視化するプログレスバー（表示済みの rate を棒で表現するだけ） */}
        <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${rate}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
