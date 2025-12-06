import { getTotalTaskCount } from "@/app/actions/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isErr } from "@/lib/result";

export default async function TotalTaskCount() {
  const result = await getTotalTaskCount();
  if (isErr(result)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>総タスク数</CardTitle>
          <CardDescription>すべてのタスクの合計</CardDescription>
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
        <CardTitle>総タスク数</CardTitle>
        <CardDescription>すべてのタスクの合計</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{result.value}</div>
      </CardContent>
    </Card>
  );
}
