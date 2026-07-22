import { ArrowLeft, ArrowRight, History } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useUI } from "../../../providers/UIContext";
import type { TimeSpanView } from "../pages/Habits";
import { getWeekDates, moveDays, moveMonth } from "../../../lib/dateUtils";

type HabitsDatePickerProps = {
  selectedView: TimeSpanView;
};

function HeaderDatePicker({ selectedView }: HabitsDatePickerProps) {
  const { selectedDate, setSelectedDate } = useUI();
  const weekDates = getWeekDates(selectedDate);
  const isDayView = selectedView === "day";
  const isWeekView = selectedView === "week";
  const isMonthView = selectedView === "month";

  const monthAndYear = selectedDate.toLocaleString("en-US", {
    month: "short",

    year: "numeric",
  });

  const dateString = isDayView
    ? `${selectedDate.getDate()} `
    : isWeekView
      ? `${weekDates[0].getDate()} - ${weekDates[6].getDate()} `
      : "";

  return (
    <div
      className={`flex items-end gap-4 ${!isMonthView ? "justify-between w-full" : ""} ${isMonthView ? "justify-between w-full sm:w-auto" : ""}`}
    >
      <span className="text-lg sm:text-xl font-semibold">
        {dateString + monthAndYear}
      </span>
      <div className={`flex items-center gap-2 `}>
        <Button
          variant={"outline"}
          onClick={() =>
            setSelectedDate((prev) =>
              isDayView
                ? moveDays(prev, -1)
                : isWeekView
                  ? moveDays(prev, -7)
                  : moveMonth(prev, -1),
            )
          }
        >
          <ArrowLeft />
        </Button>
        <Button variant={"outline"} onClick={() => setSelectedDate(new Date())}>
          <History /> Today
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            setSelectedDate((prev) =>
              isDayView
                ? moveDays(prev, 1)
                : isWeekView
                  ? moveDays(prev, 7)
                  : moveMonth(prev, 1),
            )
          }
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default HeaderDatePicker;
