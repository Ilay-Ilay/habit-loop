import { Progress } from "../../../components/ui/progress";
import { getProgress } from "../../../lib/dateUtils";
import { useUI } from "../../../providers/UIContext";
import type { Habit, HabitLog } from "../../../types/types";
type HeaderProgressProps = {
  habits: Habit[];
  logsMap: Map<string, HabitLog>;
  logs: HabitLog[];
  view: string;
};
function HabitProgress({ view, habits, logsMap, logs }: HeaderProgressProps) {
  const { selectedHabit, selectedDate } = useUI();

  const { progress, total, completed } = getProgress(
    view,
    logsMap,
    habits,
    selectedDate,
    selectedHabit,
    logs,
  );

  if (!selectedHabit || habits.length === 0) return <Progress value={0} />;

  return (
    <div className="flex flex-col gap-2">
      <Progress
        value={progress}
        indicatorStyle={
          view === "month" ? { backgroundColor: selectedHabit?.color } : {}
        }
      />
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          {completed}/{total} {view === "month" ? "days " : ""}
          completed
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {progress}%
        </span>
      </div>
    </div>
  );
}

export default HabitProgress;
