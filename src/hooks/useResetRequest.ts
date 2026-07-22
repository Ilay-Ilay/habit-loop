import { useMutation } from "@tanstack/react-query";
import { supabase } from "../types/supabase-client";
import { toast } from "sonner";
import type { ForgotPasswordCredentials } from "../types/schema";

function useResetRequest() {
  return useMutation({
    mutationFn: async (data: ForgotPasswordCredentials) => {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "http://localhost:5173/reset_password",
      });

      if (error) throw error;
    },
    onMutate: () =>
      toast(
        "If an account exists with this email, you’ll receive a password reset link shortly.",
      ),
  });
}

export default useResetRequest;
