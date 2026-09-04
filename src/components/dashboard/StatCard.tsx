import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon?: React.ReactNode;
  value: string;
  label: string;
  change: string;
  positive: boolean;
}

const StatCard = ({ icon, value, label, change, positive }: StatCardProps) => (
  <div className="bg-card border border-border rounded-xl p-5">
    {icon && <div className="mb-3 text-hr-text-light">{icon}</div>}
    <div className="flex items-center gap-2 mb-1">
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span
        className={cn(
          "flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded",
          positive
            ? "text-hr-teal bg-hr-teal-light"
            : "text-destructive bg-destructive/10"
        )}
      >
        {positive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {change}
      </span>
    </div>
    <p className="text-sm text-hr-text-light">{label}</p>
  </div>
);

export default StatCard;
