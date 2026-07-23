import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../components/ui/chart";
import type { HabitLog } from "../../../types/types";
import { getMonthlyCompletionRates } from "../../../lib/dateUtils";
import { useUI } from "../../../providers/UIContext";

type InsightsAreaChartProps = {
  logs: HabitLog[];
};
const fullMonths = [
  "January",

  "February",

  "March",

  "April",

  "May",

  "June",

  "July",

  "August",

  "September",

  "October",

  "November",

  "December",
];

const monthNames = [
  "Jan",

  "Feb",

  "Mar",

  "Apr",

  "May",

  "Jun",

  "Jul",

  "Aug",

  "Sep",

  "Oct",

  "Nov",

  "Dec",
];

const chartConfig = {
  completed: {
    label: "Completed",

    color: "#d97706",
  },
} satisfies ChartConfig;
function InsightsAreaChart({ logs }: InsightsAreaChartProps) {
  const monthDate = new Date();

  const { selectedHabit } = useUI();
  const monthlyData = getMonthlyCompletionRates(logs, selectedHabit);
  const chartData = Object.entries(monthlyData)

    .reverse()

    .map(([key, value]) => ({
      month: monthNames[Number(key.split("-")[1])],
      fullMonth: fullMonths[Number(key.split("-")[1])],

      completed: value,
    }));
  const sorted = [...chartData].sort((a, b) => b.completed - a.completed);
  return (
    <div className="border flex flex-col flex-1 p-4 sm:p-8 gap-8 border-border rounded-md">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">Monthly trend</h3>
        <span className="text-sm text-muted-foreground">{`${monthNames[monthDate.getMonth() - 5]} - ${monthNames[monthDate.getMonth()]} ${monthDate.getFullYear()}`}</span>
      </div>
      <ChartContainer
        config={chartConfig}
        className="h-20 min-h-15 md:min-h-50"
      >
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 0, right: 0, bottom: 4, top: 0 }}
        >
          <Area
            dataKey="completed"
            type="natural"
            stroke={selectedHabit?.color}
            fill={selectedHabit?.color}
            fillOpacity={0.1}
            strokeWidth={8}
          />
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            interval={0}
            tickMargin={16}
            tickLine={false}
            axisLine={false}
            padding={{ left: 12, right: 12 }}
          />
          <YAxis dataKey={"completed"} hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        </AreaChart>
      </ChartContainer>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 border border-border rounded-full full px-2 py-1">
          <div
            style={{ backgroundColor: selectedHabit?.color }}
            className="h-2 w-2 rounded full"
          />
          <span className="text-xs font-medium text-muted-foreground">
            {sorted[0]?.fullMonth || "No data"} - stongest
          </span>
        </div>
        <div className="flex items-center gap-1 border border-border rounded-full full px-2 py-1">
          <div
            style={{ backgroundColor: `${selectedHabit?.color}50` }}
            className="h-2 w-2 rounded full"
          />
          <span className="text-xs font-medium text-muted-foreground">
            {sorted[sorted.length - 1]?.fullMonth || "No data"} - weakest
          </span>
        </div>
      </div>
    </div>
  );
}

export default InsightsAreaChart;
