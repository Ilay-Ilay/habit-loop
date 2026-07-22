import { isTodaysDate } from "../../../lib/dateUtils";
import type { Habit, HabitLog } from "../../../types/types";
import HabitsCompleteButton from "./CompleteButton";

type MonthCardProps = {
  log?: HabitLog | null;
  habit: Habit;
  dateOfMonth: Date;
  isPrevDayCompleted: boolean;
  isNextDayCompleted: boolean;
};

function MonthCard({
  log,
  habit,
  dateOfMonth,
  isPrevDayCompleted,
  isNextDayCompleted,
}: MonthCardProps) {
  const isToday = isTodaysDate(dateOfMonth);
  return (
    <div
      className={`${isToday ? "shadow-xl" : ""} py-4 flex flex-col items-center gap-4 relative border-border border-b border-r `}
    >
      {isToday && (
        <div className="h-6 w-6 bg-foreground rounded-full absolute top-3 z-0" />
      )}
      <span
        className={`${isToday ? "text-background font-semibold " : ""} z-10 text-xs font-medium`}
      >
        {dateOfMonth.getDate()}
      </span>

      <div className="relative w-full flex justify-center items-center">
        {isPrevDayCompleted && log && (
          <div
            className={`${!isNextDayCompleted ? "rounded-r-lg" : ""} absolute right-1/2 h-2 w-1/2  z-0`}
            style={{ backgroundColor: habit.color }}
          />
        )}

        {isNextDayCompleted && log && (
          <div
            className={`${!isPrevDayCompleted ? "rounded-l-lg" : ""} absolute left-1/2 h-2 w-1/2  z-0`}
            style={{ backgroundColor: habit.color }}
          />
        )}
        <div className="relative z-10">
          <HabitsCompleteButton log={log} habit={habit} date={dateOfMonth} />
        </div>
      </div>
    </div>
  );
}

export default MonthCard;
