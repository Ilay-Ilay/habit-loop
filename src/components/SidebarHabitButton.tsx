import type { Habit } from "../types/types";
import { useUI } from "../providers/UIContext";
import { SidebarMenuButton } from "./ui/sidebar";
import { Field, FieldLabel } from "./ui/field";
import { Checkbox } from "./ui/checkbox";

type SidebarHabitButtonProps = {
  habit: Habit;
};

function SidebarHabitButton({ habit }: SidebarHabitButtonProps) {
  const { hiddenHabits, toggleHiddenHabit } = useUI();

  return (
    <SidebarMenuButton
      onClick={() => toggleHiddenHabit(habit.id)}
      render={
        <Field orientation={"horizontal"}>
          <Checkbox
            checked={!hiddenHabits.has(habit.id)}
            id={`habit-${habit.id}-checkbox`}
            onCheckedChange={() => toggleHiddenHabit(habit.id)}
          />
          <FieldLabel
            htmlFor={`habit-${habit.id}-checkbox`}
            className={`${!hiddenHabits.has(habit.id) ? "text-foreground" : "text-muted-foreground"} w-full justify-between`}
          >
            <span>{habit.name}</span>
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: hiddenHabits.has(habit.id) ? habit.color : "",
              }}
            />
          </FieldLabel>
        </Field>
      }
    />
  );
}

export default SidebarHabitButton;
