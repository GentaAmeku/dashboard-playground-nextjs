import { STATUS_LABELS, type Task } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import StatusIcon from "./StatusIcon";

interface StatusProps {
  status: Task["status"];
}

// ステータス値ごとの文字色クラス。
// globals.css の --status-* トークンに対応し、@theme inline 経由で text-status-* が生える。
// ラッパーに当てることで、配下のアイコン（currentColor）とラベルがまとめて同じ色になる。
const STATUS_TEXT_COLOR: Record<Task["status"], string> = {
  pending: "text-status-pending",
  in_progress: "text-status-in-progress",
  completed: "text-status-completed",
  cancelled: "text-status-cancelled",
};

export default function Status({ status }: StatusProps) {
  return (
    <div className={cn("flex items-center gap-2", STATUS_TEXT_COLOR[status])}>
      <StatusIcon status={status} />
      {status && <p>{STATUS_LABELS[status]}</p>}
    </div>
  );
}
