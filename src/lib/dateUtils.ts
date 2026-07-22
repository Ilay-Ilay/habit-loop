import type { Habit, HabitLog } from "../types/types";

export function formatDateToLocalDay(date: Date) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Intl.DateTimeFormat("en-CA", {
    timeZone,

    year: "numeric",

    month: "2-digit",

    day: "2-digit",
  }).format(date);
}

export const getToday = () => formatDateToLocalDay(new Date());

export function getMonthDates(date: Date) {
  // FIND OUT FIRST DAY OF MONTH, THEN OF THE CALENDAR WEEK, THEN END OF MONTH AND END OF CALENDAR WEEK
  // THEN LOOP THROUGH THIS TIME SPAN RETURNING DATES
  const year = date.getFullYear();
  const month = date.getMonth();
  const dates: Date[] = [];

  const startDate = new Date(year, month, 1);

  const endDate = new Date(year, month + 1, 0);

  startDate.setDate(startDate.getDate() - startDate.getDay());

  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function getWeekDates(date: Date) {
  // FIND OUT: FIRST DAY OF THE WEEK, THEN LOOPING THROGUH, ADD A DAY UNTIL END OF THE WEEK <7
  const dayOfWeek = date.getDay();

  const startOfWeek = new Date(date);

  startOfWeek.setDate(date.getDate() - dayOfWeek);

  const week = [];

  for (let index = 0; index < 7; index++) {
    const day = new Date(startOfWeek);

    day.setDate(startOfWeek.getDate() + index);

    week.push(day);
  }

  return week;
}
export function isSameDay(date1: Date, date2: Date) {
  return formatDateToLocalDay(date1) === formatDateToLocalDay(date2);
}

export function isTodaysDate(date: Date) {
  return isSameDay(date, new Date());
}

export function isPastDay(date: Date) {
  return formatDateToLocalDay(date) < formatDateToLocalDay(new Date());
}

export function isFutureDay(date: Date) {
  return formatDateToLocalDay(date) > formatDateToLocalDay(new Date());
}

export function isSameMonth(date: Date, slectedDate: Date) {
  return date.getMonth() === slectedDate.getMonth();
}

export function getProgressPercentage(value1: number, value2: number) {
  return Math.round((value1 / value2) * 100);
}
// TO MOVE THROUGH DATES WITH DATE PICKER
export function moveMonth(date: Date, amount: number) {
  const newDate = new Date(date);

  const day = newDate.getDate();

  newDate.setDate(1);

  newDate.setMonth(newDate.getMonth() + amount);

  const lastDay = new Date(
    newDate.getFullYear(),

    newDate.getMonth() + 1,

    0,
  ).getDate();

  newDate.setDate(Math.min(day, lastDay));

  return newDate;
}

export function moveDays(date: Date, amount: number) {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
}

//  PROGRESS CALCULATIONS

export function getProgress(
  view: string,
  logsMap: Map<string, HabitLog>,
  habits: Habit[],
  selectedDate: Date,
  selectedHabit: Habit | null,
  logs: HabitLog[],
) {
  let progress = 0;
  let completed = 0;
  let total = 0;

  if (!selectedHabit) return { progress, completed, total };

  if (view === "day") {
    total = habits.length;
    completed = habits.filter((habit) =>
      logsMap.has(`${habit.id}-${formatDateToLocalDay(selectedDate)}`),
    ).length;
    progress = getProgressPercentage(completed, total);
  } else if (view === "week") {
    total = habits.length * 7;
    const weekDates = getWeekDates(selectedDate);
    for (const habit of habits) {
      for (const day of weekDates) {
        if (logsMap.has(`${habit.id}-${formatDateToLocalDay(day)}`)) {
          completed++;
        }
      }
    }
    progress = getProgressPercentage(completed, habits.length * 7);
  } else if (view === "month") {
    const month = formatDateToLocalDay(selectedDate).slice(0, 7);
    const completedThisMonth =
      logs?.filter(
        (log) =>
          log.habit_id === selectedHabit?.id &&
          log.completed_date.startsWith(month),
      ) || [];
    completed = completedThisMonth.length;
    total = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    ).getDate();
    progress = getProgressPercentage(completed, total);
  }
  return { progress, completed, total };
}

export function getMonthlyCompletionRates(
  logs: HabitLog[],
  habit: Habit | null,
) {
  const months: Record<string, number> = {};

  if (!logs || !habit) return months;

  const filteredLogs = logs.filter((log) => log.habit_id === habit.id);

  for (let i = 0; i < 6; i++) {
    const current = new Date();

    current.setDate(1);

    current.setMonth(current.getMonth() - i);

    const key = `${current.getFullYear()}-${current.getMonth()}`;

    months[key] = 0;
  }

  filteredLogs.forEach((log) => {
    const logDate = new Date(log.completed_date);

    const key = `${logDate.getFullYear()}-${logDate.getMonth()}`;

    if (key in months) {
      months[key] += 1;
    }
  });

  return months;
}
// GET DAYS AMOUNT STARTING FROM WHEN THE HABIT WAS CREATED AT IN DB
export function getDaysSince(date: string) {
  const start = new Date(date);

  const today = new Date();

  start.setHours(0, 0, 0, 0);

  today.setHours(0, 0, 0, 0);

  return (
    Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
}

export function getTotalDays(habits: Habit[]) {
  if (!habits.length) return 0;

  const oldestHabit = habits.reduce((oldest, habit) =>
    new Date(habit.created_at) < new Date(oldest.created_at) ? habit : oldest,
  );

  return getDaysSince(oldestHabit.created_at);
}

export function getSuccessRate(logs: HabitLog[], habits: Habit[]) {
  let maxPossible = 0;
  habits.forEach((habit) => {
    maxPossible += getDaysSince(habit.created_at);
  });
  return Math.round((logs.length / maxPossible) * 100);
}
