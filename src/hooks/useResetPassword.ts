import { useMutation } from "@tanstack/react-query";
import { supabase } from "../types/supabase-client";
import { toast } from "sonner";

function useResetPassword() {
  return useMutation({
    mutationFn: async (password: string) => {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    },
    onSuccess: () => toast.success("Password updated"),
  });
}

export default useResetPassword;
