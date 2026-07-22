import type { Habit, HabitLog } from "../../../types/types";
import HabitsCompleteButton from "./CompleteButton";
import { formatDateToLocalDay } from "../../../lib/dateUtils";
import HabitActionsMenu from "./HabitActionsMenu";

type WeeklyCardProps = {
  logsMap: Map<string, HabitLog>;
  weekDates: Date[];
  habit: Habit;
  index: number;
};

function WeekCard({ logsMap, weekDates, habit }: WeeklyCardProps) {
  return (
    <div className="bg-background w-full flex flex-col border-b border-border active:border">
      <div className="flex  sm:hidden  justify-between items-center  border-b border-border  p-4 ">
        <div className="w-full flex items-center gap-2">
          <div
            style={{ backgroundColor: habit.color }}
            className="h-2 w-2 rounded-full"
          ></div>
          <span className="text-foreground text-xl font-medium">
            {habit.name}
          </span>
        </div>
        <HabitActionsMenu habit={habit} />
      </div>
      <div className="grid w-full grid-cols-7 sm:grid-cols-[360px_repeat(7,minmax(0,1fr))]">
        <div className="w-full hidden  sm:flex items-center gap-2 p-8 border-r border-border ">
          <div
            style={{ backgroundColor: habit.color }}
            className="h-2 w-2 rounded-full"
          ></div>
          <span className="font-medium text-foreground  text-lg ">
            {habit.name}
          </span>
        </div>
        {weekDates.map((weekDate, index) => {
          const isCompleted = logsMap.get(
            `${habit.id}-${formatDateToLocalDay(weekDate)}`,
          );
          const prevDate = weekDates[index - 1];
          const nextDate = weekDates[index + 1];
          const isNextDayCompleted =
            !!nextDate &&
            logsMap.has(`${habit.id}-${formatDateToLocalDay(nextDate)}`);
          const isPrevDayCompleted =
            !!prevDate &&
            logsMap.has(`${habit.id}-${formatDateToLocalDay(prevDate)}`);

          return (
            <div
              key={index}
              className="p-4 border-r border-border last:border-r-0 flex items-center justify-center relative"
            >
              {isPrevDayCompleted && isCompleted && (
                <div
                  className={`${!isNextDayCompleted ? "rounded-r-lg" : ""} absolute right-1/2 h-2 w-1/2  z-0`}
                  style={{ backgroundColor: habit.color }}
                />
              )}

              {isNextDayCompleted && isCompleted && (
                <div
                  className={`${!isPrevDayCompleted ? "rounded-l-lg" : ""} absolute left-1/2 h-2 w-1/2  z-0`}
                  style={{ backgroundColor: habit.color }}
                />
              )}
              <div className="z-10">
                <HabitsCompleteButton
                  date={weekDate}
                  habit={habit}
                  log={logsMap.get(
                    `${habit.id}-${formatDateToLocalDay(weekDate)}`,
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeekCard;
