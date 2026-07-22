import type { Habit, HabitLog } from "../../../types/types";
import type { TimeSpanView } from "../pages/Habits";
import HeaderDatePicker from "./HeaderDatePicker";
import HabitSelector from "./HabitSelector";
import HabitProgress from "./HabitProgress";

type HabitsHeaderProps = {
  logs: HabitLog[];
  habits: Habit[];
  logsMap: Map<string, HabitLog>;
  selectedView: TimeSpanView;
};

function Header({ logs, habits, selectedView, logsMap }: HabitsHeaderProps) {
  return (
    <div className="flex p-4 sm:p-8 flex-col gap-8 border-b border-border">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-8 items-center justify-between">
          {selectedView === "month" && <HabitSelector habits={habits} />}
          <HeaderDatePicker selectedView={selectedView} />
        </div>
        <HabitProgress
          logs={logs}
          logsMap={logsMap}
          habits={habits}
          view={selectedView}
        />
      </div>
    </div>
  );
}

export default Header;
