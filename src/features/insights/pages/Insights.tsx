import InsightsTopBar from "../components/InsightsTopBar";
import useHabits from "../../../hooks/useHabits";
import useHabitLogs from "../../../hooks/useHabitLogs";

import InsightsBarChart from "../components/InsightsBarChart";
import InsightsAreaChart from "../components/InsightsAreaChart";
import InsightsHabitDetails from "../components/InsightsHabitDetails";
import InsightsProgress from "../components/InsightsProgress";

function InsightsPage() {
  const { data: habits = [], isLoading: habitsLoading } = useHabits();
  const { data: logs = [], isLoading: logsLoading } = useHabitLogs();
  const isLoading = habitsLoading || logsLoading;
  const logsMap = new Map(
    logs.map((log) => [`${log.habit_id}-${log.completed_date}`, log]),
  );
  return (
    <>
      <InsightsTopBar habits={habits} />
      <main className="flex flex-col p-4 md:p-8 gap-4 w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <InsightsHabitDetails
            logsMap={logsMap}
            isLoading={isLoading}
            logs={logs}
          />
          <InsightsProgress
            logs={logs}
            habits={habits}
            logsMap={logsMap}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <InsightsBarChart logs={logs} />
          <InsightsAreaChart logs={logs} />
        </div>
        {/* <InsightsSummary habits={habits} logs={logs} isLoading={isLoading} /> */}
      </main>
    </>
  );
}

export default InsightsPage;
