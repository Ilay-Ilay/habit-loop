import { useMutation } from "@tanstack/react-query";

import { supabase } from "../types/supabase-client";

import useAuth from "../providers/AuthContext";
import type { ChangePasswordSchema } from "../types/schema";
import { toast } from "sonner";

function useChangePassword() {
  const { session } = useAuth();

  return useMutation({
    mutationFn: async (data: ChangePasswordSchema) => {
      if (!session) throw new Error("No session");
      if (!session.user.email) {
        throw new Error("No email found");
      }
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: session.user.email,

        password: data.old,
      });

      if (authError) {
        throw new Error("OLD_PASSWORD_INCORRECT");
      }

      const { error } = await supabase.auth.updateUser({
        password: data.new,
      });
      if (error) {
        if (error.code === "same_password") {
          throw new Error("PASSWORDS_SHOULD_BE_DIFFERENT");
        }

        throw error;
      }
    },
    onSuccess: () => toast.success("Password changed"),
    onError: (error) => {
      if (error.message === "OLD_PASSWORD_INCORRECT") {
        return toast.error("Current password is incorrect");
      }

      if (error.message === "PASSWORDS_SHOULD_BE_DIFFERENT") {
        return toast.error(
          "New password must be different from your old password",
        );
      }

      toast.error("Error changing password, please try again");
    },
  });
}

export default useChangePassword;
