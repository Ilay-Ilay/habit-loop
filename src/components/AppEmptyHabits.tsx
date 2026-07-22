import HabitsCreateHabitSheet from "../features/habits/components/CreateHabitSheet";

function AppEmptyHabits() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center h-full">
      <span className="text-xl text-muted-foreground">No habits found</span>
      <span className="text-sm text-muted-foreground max-w-sm">
        You don't have any active habits yet. Create a habit to start tracking
        your progress.
      </span>

      <HabitsCreateHabitSheet />
    </div>
  );
}

export default AppEmptyHabits;
