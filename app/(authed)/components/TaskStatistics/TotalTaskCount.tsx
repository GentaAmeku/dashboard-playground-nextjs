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
        {/* 参照の bigNum スタイル: 見出しセリフ・行間詰め・字間タイト */}
        <div className="font-heading text-3xl font-bold leading-none tracking-[-0.02em]">
          {result.value}
        </div>
      </CardContent>
    </Card>
  );
}
