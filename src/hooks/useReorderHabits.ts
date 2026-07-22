import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Habit } from "../types/types";
import { supabase } from "../types/supabase-client";

type Update = {
  id: number;
  order: number;
};

function useReorder() {
  const queryClient = useQueryClient();
  const queryKey = ["habits"];
  return useMutation({
    mutationFn: async (updates: Update[]) => {
      const { error } = await supabase.rpc("reorder_habits", {
        updates,
      });
      if (error) throw error;
    },
    onMutate: (variables) => {
      const updateMap = Object.fromEntries(
        variables.map(({ id, order }) => [id, order]),
      );
      const prev = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: Habit[] = []) =>
        old.map((habit) => {
          const newOrder = updateMap[habit.id];

          return newOrder === undefined ? habit : { ...habit, order: newOrder };
        }),
      );
      return { prev };
    },
    onError: (_error, _variables, context) => {
      if (context) queryClient.setQueryData(queryKey, context.prev);
    },
  });
}

export default useReorder;
