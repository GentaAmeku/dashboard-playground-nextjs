import { PRIORITY_LABELS, type Task } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import PriorityIcon from "./PriorityIcon";

interface PriorityProps {
  priority: Task["priority"];
}

// 優先度値ごとの文字色クラス。
// globals.css の --priority-* トークンに対応し、@theme inline 経由で text-priority-* が生える。
// ラッパーに当てることで、配下のアイコン（currentColor）とラベルがまとめて同じ色になる。
const PRIORITY_TEXT_COLOR: Record<Task["priority"], string> = {
  low: "text-priority-low",
  medium: "text-priority-medium",
  high: "text-priority-high",
};

export default function Priority({ priority }: PriorityProps) {
  return (
    <div
      className={cn("flex items-center gap-2", PRIORITY_TEXT_COLOR[priority])}
    >
      <PriorityIcon priority={priority} />
      {priority && <p>{PRIORITY_LABELS[priority]}</p>}
    </div>
  );
}
