import { formatDateToLocalDay } from "../../../lib/dateUtils";
import type { Habit, HabitLog } from "../../../types/types";
import DayCard from "./DayCard";

export type HabitsViewProps = {
  habits: Habit[];
  logsMap: Map<string, HabitLog>;
  selectedDate: Date;
};

function DayView({ habits, logsMap, selectedDate }: HabitsViewProps) {
  return (
    <div className="flex flex-col">
      {habits.map((habit, index) => (
        <DayCard
          selectedDate={selectedDate}
          key={habit.id}
          habit={habit}
          habitLog={
            logsMap.get(`${habit.id}-${formatDateToLocalDay(selectedDate)}`) ||
            null
          }
          index={index}
        />
      ))}
    </div>
  );
}

export default DayView;
