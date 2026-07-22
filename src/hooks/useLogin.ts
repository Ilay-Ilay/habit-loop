import { useMutation } from "@tanstack/react-query";
import type { LoginCredentials } from "../types/schema";
import { supabase } from "../types/supabase-client";

function useLogin() {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw error;
      return data;
    },
  });
}

export default useLogin;
