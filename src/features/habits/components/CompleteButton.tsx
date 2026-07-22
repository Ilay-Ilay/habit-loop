import { Check, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { Habit, HabitLog } from "../../../types/types";
import {
  formatDateToLocalDay,
  isFutureDay,
  isPastDay,
  isTodaysDate,
} from "../../../lib/dateUtils";
import useToggleLog from "../../../hooks/useToggleLog";
import { Skeleton } from "../../../components/ui/skeleton";

type CompleteButtonProps = {
  date: Date;
  habit: Habit | null;
  log?: HabitLog | null;
};

function HabitsCompleteButton({ date, habit, log }: CompleteButtonProps) {
  const isCompleted = !!log;
  const isToday = isTodaysDate(date);
  const isPast = isPastDay(date);
  const isFuture = isFutureDay(date);
  const { mutate: toggle } = useToggleLog();
  if (!habit) return <Skeleton className="h-10 w-10 rounded-md" />;
  if (isPast)
    return (
      <Button
        disabled={!isCompleted}
        className={`${isCompleted ? "text-background" : "text-foreground"} h-10 w-10 z-50`}
        style={{
          backgroundColor: isCompleted ? habit.color : "var(--secondary)",
        }}
      >
        {isCompleted ? <Check strokeWidth={4} /> : <X strokeWidth={4} />}
      </Button>
    );
  if (isFuture)
    return (
      <Button
        variant={"secondary"}
        className={"text-foreground   h-10 w-10"}
        style={{
          backgroundColor: "var(--secondary)",
        }}
      >
        {""}
      </Button>
    );
  if (isToday)
    return (
      <Button
        className={"text-background   h-10 w-10"}
        onClick={() =>
          toggle({
            completed_date: formatDateToLocalDay(date),
            isCompleted,
            habit_id: habit.id,
          })
        }
        style={{
          backgroundColor: habit.color,
        }}
      >
        {isCompleted ? <Check strokeWidth={4} /> : ""}
      </Button>
    );
}

export default HabitsCompleteButton;
