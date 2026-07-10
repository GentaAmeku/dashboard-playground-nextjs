import {
  CheckCircleIcon,
  CircleIcon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";
import type { Task } from "@/lib/db/schema";
import { STATUS } from "@/lib/db/schema";

interface StatusIconProps {
  status: Task["status"];
}

// 色は付けず size のみ指定する。stroke は currentColor 既定なので、
// 親（Status）に当てた text-status-* トークン色をそのまま継承する。
export default function StatusIcon({ status }: StatusIconProps) {
  if (status === STATUS.IN_PROGRESS) return <ClockIcon size={16} />;

  if (status === STATUS.COMPLETED) return <CheckCircleIcon size={16} />;

  if (status === STATUS.CANCELLED) return <XCircleIcon size={16} />;

  if (status === STATUS.PENDING) return <CircleIcon size={16} />;

  return <CircleIcon size={16} />;
}
