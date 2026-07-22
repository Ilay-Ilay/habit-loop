import { SidebarTrigger } from "../../../components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import type { TimeSpanView } from "../pages/Habits";
import HabitsCreateHabitSheet from "./CreateHabitSheet.tsx";

const data = {
  tabs: [
    { value: "month", label: "Month" },
    { value: "week", label: "Week" },
    { value: "day", label: "Day" },
  ],
};

type TopBarProps = {
  timeSpanView: TimeSpanView;
  setTimeSpanView: React.Dispatch<React.SetStateAction<TimeSpanView>>;
};

function TopBar({ timeSpanView, setTimeSpanView }: TopBarProps) {
  return (
    <header className="sticky w-full top-0 flex justify-between shrink-0 items-center gap-2 border-b bg-background px-4 sm:px-8 py-4 z-50">
      <SidebarTrigger />
      <Tabs
        value={timeSpanView}
        onValueChange={(value) => setTimeSpanView(value as TimeSpanView)}
      >
        <TabsList className="h-11">
          {data.tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-4 sm:px-6 "
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex items-center gap-2">
        <HabitsCreateHabitSheet />
      </div>
    </header>
  );
}

export default TopBar;
