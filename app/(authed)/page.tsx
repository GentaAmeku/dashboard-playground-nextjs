import TaskStatistics from "./components/TaskStatistics";

export default function Home() {
  return (
    // 参照レイアウト（DashboardScreen.jsx）に合わせ、本文とカード群の間を 24px（space-y-6）に。
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        {/* 見出しは Warm Luxe の見出しセリフ（Newsreader = font-heading）で表示する */}
        <h2 className="font-heading text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">タスクの統計情報を確認できます</p>
      </div>
      <TaskStatistics />
    </div>
  );
}
