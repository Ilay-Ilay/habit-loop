import { useMutation } from "@tanstack/react-query";
import type { HabitUpdate } from "../types/types";
import { supabase } from "../types/supabase-client";

function useUpdateHabit() {
  return useMutation({
    mutationFn: async ({ color, id, name }: HabitUpdate) => {
      if (!id) return;
      const { error } = await supabase
        .from("habits")
        .update({ color, name })
        .eq("id", id);
      if (error) throw error;
    },
  });
}

export default useUpdateHabit;
