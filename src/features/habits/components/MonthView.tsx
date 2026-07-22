import { useEffect } from "react";
import { Skeleton } from "../../../components/ui/skeleton";
import { formatDateToLocalDay, getMonthDates } from "../../../lib/dateUtils";
import { useUI } from "../../../providers/UIContext";
import type { HabitsViewProps } from "./DayView";
import MonthCard from "./MonthCard";
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MonthView({ selectedDate, logsMap, habits }: HabitsViewProps) {
  const monthDates = getMonthDates(selectedDate);

  const isToday = selectedDate.getDay();
  const { selectedHabit, setSelectedHabit } = useUI();
  useEffect(() => {
    if (!selectedHabit && habits) setSelectedHabit(habits[0]);
  }, [selectedHabit, habits, setSelectedHabit]);

  return (
    <main className="flex flex-col h-fu">
      <div className="grid grid-cols-7 border-b border-border w-full">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className="flex p-4 border-r borfer-border items-center justify-center"
          >
            <span
              className={`${isToday === index ? "text-foreground" : "text-muted-foreground"} text-xs font-semibold`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
      <div className="grid flex-1 w-full grid-cols-7">
        {monthDates.map((date, index) => {
          const prevDate = monthDates[index - 1];

          const nextDate = monthDates[index + 1];

          return selectedHabit ? (
            <MonthCard
              dateOfMonth={date}
              key={index}
              habit={selectedHabit}
              log={logsMap.get(
                `${selectedHabit.id}-${formatDateToLocalDay(date)}`,
              )}
              isPrevDayCompleted={
                !!prevDate &&
                logsMap.has(
                  `${selectedHabit.id}-${formatDateToLocalDay(prevDate)}`,
                )
              }
              isNextDayCompleted={
                !!nextDate &&
                logsMap.has(
                  `${selectedHabit.id}-${formatDateToLocalDay(nextDate)}`,
                )
              }
            />
          ) : (
            <Skeleton key={index} />
          );
        })}
      </div>
    </main>
  );
}

export default MonthView;
