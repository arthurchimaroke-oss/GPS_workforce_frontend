import { cn } from "@/lib/utils";

interface RadioCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const RadioCard = ({ title, description, selected, onClick }: RadioCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between p-4 rounded-lg border text-left transition-all",
      selected
        ? "border-hr-teal bg-hr-teal-light"
        : "border-border bg-background hover:border-hr-teal/50"
    )}
  >
    <div className="flex-1 mr-4">
      <p className="font-semibold text-foreground text-sm">{title}</p>
      <p className="text-xs text-hr-text-light mt-1">{description}</p>
    </div>
    <div
      className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
        selected ? "border-hr-teal" : "border-hr-gray"
      )}
    >
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-hr-teal" />}
    </div>
  </button>
);

export default RadioCard;
