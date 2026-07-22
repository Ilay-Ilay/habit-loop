import { formatDateToLocalDay } from "../../../lib/dateUtils";
import type { Habit, HabitLog } from "../../../types/types";

export function getStreak(habit: Habit | null, logsMap: Map<string, HabitLog>) {
  const date = new Date();
  let count = 0;
  if (!habit || !logsMap) return count;
  if (logsMap.has(`${habit.id}-${formatDateToLocalDay(date)}`)) count += 1;
  date.setDate(date.getDate() - 1);
  while (logsMap.has(`${habit.id}-${formatDateToLocalDay(date)}`)) {
    count += 1;

    date.setDate(date.getDate() - 1);
  }

  return count;
}
