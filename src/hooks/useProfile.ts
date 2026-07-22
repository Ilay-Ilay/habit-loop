import { useQuery } from "@tanstack/react-query";
import { supabase } from "../types/supabase-client";

function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        throw error;
      }
      return data[0];
    },
  });
}

export default useProfile;
