import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type HabitLog, type HabitLogInsert } from "../types/types";
import { supabase } from "../types/supabase-client";

type ToggleLogType = HabitLogInsert & {
  isCompleted: boolean;
};

type OptimisticHabitLog = Pick<
  HabitLog,
  "id" | "habit_id" | "completed_date"
> & {
  optimistic?: boolean;
};

function useToggleLog() {
  const queryClient = useQueryClient();
  const queryKey = ["habit_logs"];

  return useMutation({
    mutationFn: async ({
      habit_id,
      completed_date,
      isCompleted,
    }: ToggleLogType) => {
      if (isCompleted) {
        const { data, error } = await supabase
          .from("habit_logs")
          .delete()
          .eq("habit_id", habit_id)
          .eq("completed_date", completed_date);
        if (error) {
          console.log(error);

          throw error;
        }
        return data;
      } else {
        const { data, error } = await supabase
          .from("habit_logs")
          .insert({ habit_id, completed_date });
        if (error) {
          console.log(error);

          throw error;
        }

        return data;
      }
    },
    onMutate: ({ habit_id, completed_date, isCompleted }) => {
      const prev = queryClient.getQueryData(queryKey);
      queryClient.setQueryData<OptimisticHabitLog[]>(queryKey, (old = []) => {
        if (isCompleted)
          return old.filter(
            (log) =>
              !(
                log.habit_id === habit_id &&
                completed_date === log.completed_date
              ),
          );
        return [
          ...old,

          {
            id: Date.now(),

            habit_id,

            completed_date,

            optimistic: true,
          },
        ];
      });
      return { prev };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.prev);
    },
  });
}

export default useToggleLog;
