import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";
import type { Task } from "@/lib/db/schema";
import { PRIORITY } from "@/lib/db/schema";

interface PriorityIconProps {
  priority: Task["priority"];
}

// 色は付けず size のみ指定する。stroke は currentColor 既定なので、
// 親（Priority）に当てた text-priority-* トークン色をそのまま継承する。
export default function PriorityIcon({ priority }: PriorityIconProps) {
  if (priority === PRIORITY.LOW) return <ArrowDownIcon size={16} />;

  if (priority === PRIORITY.MEDIUM) return <ArrowRightIcon size={16} />;

  if (priority === PRIORITY.HIGH) return <ArrowUpIcon size={16} />;

  return <ArrowUpIcon size={16} />;
}
