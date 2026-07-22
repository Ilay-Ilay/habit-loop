import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Skeleton } from "../../../components/ui/skeleton";
import { useUI } from "../../../providers/UIContext";
import type { Habit } from "../../../types/types";
type HabitsSelectProps = { habits: Habit[] };
function HabitSelector({ habits }: HabitsSelectProps) {
  const { selectedHabit, setSelectedHabit } = useUI();
  useEffect(() => {
    if (!selectedHabit && habits) setSelectedHabit(habits[0]);
  }, [selectedHabit, habits, setSelectedHabit]);

  if (!selectedHabit) return <Skeleton className="h-8 w-full sm:max-w-64" />;
  if (!habits || habits.length === 0)
    return (
      <Select>
        <SelectTrigger>
          <SelectValue>Select a habit</SelectValue>
        </SelectTrigger>
      </Select>
    );

  const selectedHabitId = String(selectedHabit.id);
  return (
    <Select
      onValueChange={(value) => {
        const selected =
          habits.find((habit) => habit.id === Number(value)) || null;
        setSelectedHabit(selected);
      }}
      value={selectedHabitId}
    >
      <SelectTrigger className="w-full sm:max-w-64">
        <SelectValue>
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: selectedHabit.color }}
              className="h-2 w-2 rounded-full"
            ></div>
            <span className="font-medium">{selectedHabit.name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {habits.map((habit) => (
            <SelectItem value={String(habit.id)} key={habit.id}>
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: habit.color }}
                  className="h-2 w-2 rounded-full"
                ></div>
                <span className="font-medium">{habit.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default HabitSelector;
