import { useQuery } from "@tanstack/react-query";
import { supabase } from "../types/supabase-client";

function useHabits() {
  return useQuery({
    queryKey: ["habits"],

    queryFn: async () => {
      const { data, error } = await supabase

        .from("habits")

        .select("*");

      if (error) {
        throw error;
      }

      return data;
    },
  });
}

export default useHabits;
