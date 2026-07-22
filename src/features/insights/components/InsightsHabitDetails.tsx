import { formatDateToLocalDay } from "../../../lib/dateUtils";
import { useUI } from "../../../providers/UIContext";
import type { HabitLog } from "../../../types/types";
import HabitsCompleteButton from "../../habits/components/CompleteButton";
import { getStreak } from "../utils/getStreak";
import {
  getHabitSuccessRate,
  getHabitTotalCompleted,
} from "../utils/insightsUtils";
type InsightsHabitDetailsProps = {
  logsMap: Map<string, HabitLog>;
  isLoading: boolean;
  logs: HabitLog[];
};
function InsightsHabitDetails({
  logsMap,
  isLoading,
  logs,
}: InsightsHabitDetailsProps) {
  const { selectedHabit } = useUI();
  const streak = getStreak(selectedHabit, logsMap);
  const completed = getHabitTotalCompleted(selectedHabit, logs);
  const successRate = getHabitSuccessRate(selectedHabit, logs);
  return (
    <div className="border flex flex-col flex-1 p-4 sm:p-8 gap-12 border-border rounded-md">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <HabitsCompleteButton
            log={logsMap.get(
              `${selectedHabit?.id}-${formatDateToLocalDay(new Date())}`,
            )}
            habit={selectedHabit}
            date={new Date()}
          />
          <h3 className="text-2xl md:text-3xl font-medium">
            {selectedHabit?.name}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-1 border-r border-border pr-4 md:pr-8">
          <span className="text-2xl font-medium">
            {isLoading ? 0 : completed}
          </span>
          <span className="text-sm text-muted-foreground">Completed</span>
        </div>
        <div className="flex  flex-col gap-1 border-r border-border pr-4 md:pr-8">
          <span className="text-2xl font-medium">
            {isLoading ? 0 : successRate}%
          </span>

          <span className="text-sm text-muted-foreground">Success rate</span>
        </div>
        <div className="flex flex-col gap-1 pr-4 md:pr-8">
          <span className="text-2xl font-medium">{isLoading ? 0 : streak}</span>
          <span className="text-sm text-muted-foreground">Current streak</span>
        </div>
      </div>
    </div>
  );
}

export default InsightsHabitDetails;
