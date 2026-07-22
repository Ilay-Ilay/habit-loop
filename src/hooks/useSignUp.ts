import { useMutation } from "@tanstack/react-query";

import type { SignUpCredentials } from "../types/schema";
import { supabase } from "../types/supabase-client";

function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password }: SignUpCredentials) => {
      const { data, error } = await supabase.auth.signUp({
        email,

        password,
      });

      if (error) throw error;

      return data;
    },

    retry: false,
  });
}

export default useSignUp;
