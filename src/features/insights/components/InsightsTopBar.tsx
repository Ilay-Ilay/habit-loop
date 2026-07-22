// type InsightsTopBarProps = {};

import { SidebarTrigger } from "../../../components/ui/sidebar";
import { useUI } from "../../../providers/UIContext";
import type { Habit } from "../../../types/types";
import HabitSelector from "../../habits/components/HabitSelector";
type InsightsTopBarProps = {
  habits: Habit[];
};
function InsightsTopBar({ habits }: InsightsTopBarProps) {
  const { hiddenHabits } = useUI();

  const orderedHabits = [...habits].sort((a, b) => a.order - b.order);
  const visibleHabits = orderedHabits.filter(
    (habit) => !hiddenHabits.has(habit.id),
  );
  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-2 border-b bg-background px-8 z-50">
      <div className="flex items-center gap-4 w-full">
        <SidebarTrigger />
        <HabitSelector habits={visibleHabits} />
      </div>
    </header>
  );
}

export default InsightsTopBar;
