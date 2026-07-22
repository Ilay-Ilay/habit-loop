import { getDaysSince } from "../../../lib/dateUtils";
import type { Habit, HabitLog } from "../../../types/types";

export function getHabitBestDays(habit: Habit | null, logs: HabitLog[]) {
  const days: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  if (!habit) return days;
  const filteredLogs = logs.filter((log) => log.habit_id === habit.id);
  filteredLogs.forEach((log) => {
    const date = new Date(log.completed_date);

    days[date.getDay()] += 1;
  });

  return days;
}

export function getHabitTotalCompleted(habit: Habit | null, logs: HabitLog[]) {
  if (!habit) return 0;
  const filteredLogs = logs.filter((log) => log.habit_id === habit.id);
  return filteredLogs.length;
}

export function getHabitSuccessRate(habit: Habit | null, logs: HabitLog[]) {
  if (!habit) return 0;

  const completed = getHabitTotalCompleted(habit, logs);

  const days = getDaysSince(habit.created_at);

  if (days === 0) return 0;

  console.log(habit.created_at);
  console.log("COMPLETED", completed);
  console.log(days);

  return Math.round((completed / days) * 100);
}
