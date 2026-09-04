import { cn } from "@/lib/utils";

interface RadioChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const RadioChip = ({ label, selected, onClick, className }: RadioChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all",
      selected
        ? "border-hr-teal bg-hr-teal-light text-foreground"
        : "border-border bg-background text-hr-text hover:border-hr-teal/50",
      className
    )}
  >
    <span>{label}</span>
    <div
      className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 flex-shrink-0",
        selected ? "border-hr-teal" : "border-hr-gray"
      )}
    >
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />}
    </div>
  </button>
);

export default RadioChip;
