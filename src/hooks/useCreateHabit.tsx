import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Habit, HabitInsert } from "../types/types";
import { supabase } from "../types/supabase-client";

function getNewHabitOrder(habits: Habit[]) {
  if (habits.length === 0) return 0;

  return Math.min(...habits.map((habit) => habit.order)) - 10000;
}

function useCreateHabit() {
  const queryClient = useQueryClient();
  const queryKey = ["habits"];
  return useMutation({
    mutationFn: async (formData: Omit<HabitInsert, "order">) => {
      const habits = queryClient.getQueryData<Habit[]>(queryKey) ?? [];

      const order = getNewHabitOrder(habits);
      const { error } = await supabase
        .from("habits")
        .insert({ color: formData.color, name: formData.name, order });
      if (error) throw error;
    },
    onMutate: (variabales) => {
      const habits = queryClient.getQueryData<Habit[]>(queryKey) ?? [];

      const order = getNewHabitOrder(habits);

      queryClient.setQueryData<HabitInsert[]>(queryKey, (old = []) => [
        ...old,
        {
          name: variabales.name,
          color: variabales.color,
          habit_id: Date.now(),
          order,
        },
      ]);

      return { habits };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData<HabitInsert[]>(queryKey, context?.habits);
    },
  });
}

export default useCreateHabit;
