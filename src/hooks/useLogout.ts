import { useMutation } from "@tanstack/react-query";
import { supabase } from "../types/supabase-client";

export default function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    },
  });
}
