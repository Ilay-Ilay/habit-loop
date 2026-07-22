import { getWeekDates, isTodaysDate } from "../../../lib/dateUtils";
import type { HabitsViewProps } from "./DayView";
import WeekCard from "./WeekCard";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function WeekView({ habits, logsMap, selectedDate }: HabitsViewProps) {
  const weekDates = getWeekDates(selectedDate);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 sm:grid-cols-[360px_repeat(7,minmax(0,1fr))] border-b border-border">
        <span className="hidden sm:flex items-center text-xs font-semibold text-muted-foreground py-4 px-8 border-r border-border">
          Habits
        </span>
        {weekDates.map((weekDate, index) => {
          const isToday = isTodaysDate(weekDate);
          return (
            <div
              key={index}
              className="flex items-center justify-center border-r borer-border flex-col gap-1 p-4 last:border-r-0"
            >
              <span
                className={`text-xs font-semibold ${isToday ? "text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                {weekDays[weekDate.getDay()]}
              </span>
            </div>
          );
        })}
      </div>
      {habits.map((habit, index) => (
        <WeekCard
          key={habit.id}
          index={index}
          habit={habit}
          weekDates={weekDates}
          logsMap={logsMap}
        />
      ))}
    </div>
  );
}

export default WeekView;
