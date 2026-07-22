import { getSuccessRate, getTotalDays } from "../../../lib/dateUtils";
import type { Habit, HabitLog } from "../../../types/types";
import SummaryCard from "./SummaryCard";

type InsightsSummaryProps = {
  isLoading: boolean;
  habits: Habit[];
  logs: HabitLog[];
};

function InsightsSummary({ habits, logs, isLoading }: InsightsSummaryProps) {
  const totalDays = getTotalDays(habits);

  return (
    <div className="flex-1 flex flex-col sm:flex-row gap-4">
      <SummaryCard
        isLoading={isLoading}
        label={habits.length === 1 ? "Active habit" : "Active habits"}
        value={`${habits.length}`}
      />
      <SummaryCard
        isLoading={isLoading}
        label={logs.length === 1 ? "Compelition" : "Total completions"}
        value={String(logs.length)}
      />
      <SummaryCard
        isLoading={isLoading}
        label={"Success rate"}
        value={`${getSuccessRate(logs, habits) || 0}%`}
      />
      <SummaryCard
        isLoading={isLoading}
        label={totalDays === 1 ? "Day" : "Total days"}
        value={`${totalDays || 0}`}
      />
    </div>
  );
}

export default InsightsSummary;
