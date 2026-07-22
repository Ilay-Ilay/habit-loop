import { Skeleton } from "../../../components/ui/skeleton";

type SummaryCardProps = {
  value: string;
  label: string;
  isLoading: boolean;
};

function SummaryCard({ value, label, isLoading }: SummaryCardProps) {
  return (
    <div className="flex-1 flex flex-col border rounded-md border-border p-4 sm:p-8 w-full gap-1">
      {isLoading ? (
        <Skeleton className="h-12 w-24 rounded-md" />
      ) : (
        <span className="text-3xl font-semibold">{value}</span>
      )}
      {isLoading ? (
        <Skeleton className="h-4 w-44 rounded-md" />
      ) : (
        <span className="text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  );
}

export default SummaryCard;
