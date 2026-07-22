import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Habit } from "../types/types";
import { supabase } from "../types/supabase-client";

function useDeleteHabit() {
  const queryClient = useQueryClient();
  const queryKey = ["habits"];

  return useMutation({
    mutationFn: async (habit_id: number) => {
      const { error } = await supabase
        .from("habits")
        .delete()
        .eq("id", habit_id);
      if (error) throw error;
    },
    onMutate: (variables) => {
      queryClient.setQueryData<Habit[]>(queryKey, (prev) => {
        if (prev) return prev.filter((habit) => habit.id !== variables);
      });
      const prev = queryClient.getQueryData(queryKey);
      return { prev };
    },
    onError: (_error, _variables, context) => {
      if (context) queryClient.setQueryData(queryKey, context.prev);
    },
  });
}

export default useDeleteHabit;
