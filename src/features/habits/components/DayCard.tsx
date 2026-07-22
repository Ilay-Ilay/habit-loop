import { useSortable } from "@dnd-kit/react/sortable";
import { Field, FieldLabel } from "../../../components/ui/field";
import useToggleLog from "../../../hooks/useToggleLog";
import { formatDateToLocalDay } from "../../../lib/dateUtils";
import type { Habit, HabitLog } from "../../../types/types";
import HabitsCompleteButton from "./CompleteButton";
import { Button } from "../../../components/ui/button";
import { GripVertical } from "lucide-react";
import HabitActionsMenu from "./HabitActionsMenu";

type DayCardProps = {
  habit: Habit;
  habitLog: HabitLog | null;
  selectedDate: Date;
  index: number;
};

function DayCard({ habit, habitLog, selectedDate, index }: DayCardProps) {
  const { mutate: toggle } = useToggleLog();
  const { ref, handleRef } = useSortable({ index, id: habit.id });

  return (
    <div
      ref={ref}
      className="flex justify-between p-4 lg:p-8 border-b border-border bg-background items-center gap-4"
    >
      <Button
        ref={handleRef}
        size={"icon-sm"}
        variant={"ghost"}
        className={"cursor-grab active:cursor-grabbing"}
      >
        <GripVertical className="text-muted-foreground" />
      </Button>
      <Field
        onClick={() =>
          toggle({
            completed_date: formatDateToLocalDay(selectedDate),
            habit_id: habit.id,
            isCompleted: !!habitLog,
          })
        }
        className="flex items-center gap-2 select-none cursor-pointer"
        orientation={"horizontal"}
      >
        <HabitsCompleteButton
          habit={habit}
          log={habitLog}
          date={selectedDate}
        />
        <FieldLabel className="text-lg font-medium truncate">
          {habit.name}
        </FieldLabel>
      </Field>
      <HabitActionsMenu habit={habit} />
    </div>
  );
}

export default DayCard;
