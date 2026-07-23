import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../components/ui/chart";
import type { HabitLog } from "../../../types/types";
import { useUI } from "../../../providers/UIContext";
import { getHabitBestDays } from "../utils/insightsUtils";

type InsightsBarChartProps = {
  logs: HabitLog[];
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fullDays = [
  "Sunday",

  "Monday",

  "Tuesday",

  "Wednesday",

  "Thursday",

  "Friday",

  "Saturday",
];

const chartConfig = {
  completed: {
    label: "Completed",

    color: "#6366F1",
  },
} satisfies ChartConfig;
function InsightsBarChart({ logs }: InsightsBarChartProps) {
  const { selectedHabit } = useUI();
  const data = getHabitBestDays(selectedHabit, logs);

  const chartData = Object.entries(data).map(([day, count]) => ({
    day: days[Number(day)],

    fullDay: fullDays[Number(day)],

    completed: Number(count),
  }));
  const sorted = [...chartData].sort((a, b) => b.completed - a.completed);
  return (
    <div className="border flex flex-1 flex-col min-w-0 min-h-90 p-4 sm:p-8 gap-6 rounded-md">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">Completion patterns</h3>
        <span className="text-sm text-muted-foreground">
          Discover your best days
        </span>
      </div>
      <ChartContainer
        config={chartConfig}
        className="w-full flex-1 min-h-0 aspect-auto"
      >
        <BarChart
          width={undefined}
          height={undefined}
          data={chartData}
          margin={{ top: 0, right: 8, left: 8, bottom: 4 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickMargin={16}
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis dataKey={"completed"} hide fontSize={12} />
          <Bar dataKey="completed" fill={selectedHabit?.color} radius={4} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 border border-border rounded-full full px-2 py-1">
          <div
            style={{ backgroundColor: selectedHabit?.color }}
            className="h-2 w-2 rounded full"
          />
          <span className="text-xs font-medium text-muted-foreground">
            {sorted[0]?.fullDay ?? "No data"} - strongest
          </span>
        </div>
        <div className="flex items-center gap-1 border border-border rounded-full full px-2 py-1">
          <div
            style={{ backgroundColor: `${selectedHabit?.color}50` }}
            className="h-2 w-2 rounded full"
          />
          <span className="text-xs font-medium text-muted-foreground">
            {sorted[sorted.length - 1].fullDay ?? "No data"} - weakest
          </span>
        </div>
      </div>
    </div>
  );
}

export default InsightsBarChart;
