import { useQuery } from "@tanstack/react-query";
import { supabase } from "../types/supabase-client";

function useHabitLogs() {
  return useQuery({
    queryKey: ["habit_logs"],

    queryFn: async () => {
      const { data, error } = await supabase

        .from("habit_logs")

        .select("*");

      if (error) throw error;

      return data;
    },
  });
}

export default useHabitLogs;
