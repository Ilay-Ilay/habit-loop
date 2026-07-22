import { Progress } from "../../../components/ui/progress";
import { getProgress } from "../../../lib/dateUtils";
import { useUI } from "../../../providers/UIContext";
import type { Habit, HabitLog } from "../../../types/types";
type InsightsProgressProps = {
  isLoading: boolean;
  habits: Habit[];
  logs: HabitLog[];
  logsMap: Map<string, HabitLog>;
};
function InsightsProgress({ logsMap, habits, logs }: InsightsProgressProps) {
  const { selectedHabit } = useUI();
  const { progress, total, completed } = getProgress(
    "month",
    logsMap,
    habits,
    new Date(),
    selectedHabit,
    logs,
  );

  return (
    <div className="border flex flex-col flex-1 p-4 sm:p-8 gap-12 border-border rounded-md justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">Monthly Progress</h3>

        <span className="text-sm text-muted-foreground">
          Habit completion this month
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Progress
          value={progress ?? 0}
          indicatorStyle={{ backgroundColor: selectedHabit?.color }}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {completed ?? 0}/{total ?? 0} {"days "}
            completed
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {progress ?? 0}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default InsightsProgress;
