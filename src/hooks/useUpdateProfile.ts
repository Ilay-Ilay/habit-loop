import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../types/supabase-client";
import type { ProfileUpdate } from "../types/types";
import { toast } from "sonner";
import useAuth from "../providers/AuthContext";

export default function useUpdateProfile() {
  const { session } = useAuth();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileUpdate) => {
      if (!session?.user.id) {
        throw new Error("User is not authenticated");
      }

      const { error } = await supabase

        .from("profiles")

        .update({
          last_name: data.last_name,

          name: data.name,
        })

        .eq("id", session.user.id);

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success("Profile updated");

      queryClient.invalidateQueries({
        queryKey: ["profile", session?.user.id],
      });
    },

    onError: () => {
      toast.error("Error updating profile, please try again");
    },
  });
}
