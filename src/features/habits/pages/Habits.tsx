import { useState } from "react";
import TopBar from "../components/TopBar";
import DayView from "../components/DayView";
import WeekView from "../components/WeekView";
import MonthView from "../components/MonthView";
import { DragDropProvider } from "@dnd-kit/react";
import useReorder from "../../../hooks/useReorderHabits";
import { useUI } from "../../../providers/UIContext";
import useHabits from "../../../hooks/useHabits";
import useHabitLogs from "../../../hooks/useHabitLogs";
import LoadingSpinner from "../../../components/pages/LoadingSpinner";
import { isSortable } from "@dnd-kit/react/sortable";
import Header from "../components/Header";
import AppEmptyHabits from "../../../components/AppEmptyHabits";

export type TimeSpanView = "month" | "week" | "day";

function Habits() {
  const [timeSpanView, setTimeSpanView] = useState<TimeSpanView>("month");
  const { mutate: reorderHabits } = useReorder();
  const { selectedDate, hiddenHabits } = useUI();

  const { data: habits = [], isLoading: habitsLoading } = useHabits();
  const { data: logs = [], isLoading: logsLoading } = useHabitLogs();
  const orderedHabits = [...habits].sort((a, b) => a.order - b.order);
  const visibleHabits = orderedHabits.filter(
    (habit) => !hiddenHabits.has(habit.id),
  );
  const logsMap = new Map(
    logs.map((log) => [`${log.habit_id}-${log.completed_date}`, log]),
  );
  const isLoading = habitsLoading || logsLoading;
  // EDIT TO SKELETON FOR EACH VIEW LATER
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar timeSpanView={timeSpanView} setTimeSpanView={setTimeSpanView} />
      <Header
        habits={visibleHabits}
        logs={logs}
        logsMap={logsMap}
        selectedView={timeSpanView}
      />
      {visibleHabits.length > 0 ? (
        timeSpanView === "day" ? (
          <DragDropProvider
            onDragEnd={({ operation, canceled }) => {
              if (canceled) return;
              const { source } = operation;
              if (!isSortable(source)) return;
              const { index, initialIndex } = source;
              const sourceId = visibleHabits[initialIndex].id;
              const targetId = visibleHabits[index].id;
              const sourceIndex = orderedHabits.findIndex(
                (h) => h.id === sourceId,
              );
              const targetIndex = orderedHabits.findIndex(
                (h) => h.id === targetId,
              );
              const reorder = [...orderedHabits];
              const [draggedHabit] = reorder.splice(sourceIndex, 1);
              reorder.splice(targetIndex, 0, draggedHabit);
              const updates = reorder.map((habit, index) => ({
                id: habit.id,

                order: index,
              }));
              reorderHabits(updates);
            }}
          >
            <DayView
              logsMap={logsMap}
              habits={visibleHabits}
              selectedDate={selectedDate}
            />
          </DragDropProvider>
        ) : timeSpanView === "week" ? (
          <WeekView
            logsMap={logsMap}
            habits={visibleHabits}
            selectedDate={selectedDate}
          />
        ) : (
          <MonthView
            selectedDate={selectedDate}
            habits={habits}
            logsMap={logsMap}
          />
        )
      ) : (
        <AppEmptyHabits />
      )}
    </div>
  );
}

export default Habits;
