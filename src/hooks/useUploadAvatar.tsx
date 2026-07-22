import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAuth from "../providers/AuthContext";

import { supabase } from "../types/supabase-client";
import { toast } from "sonner";

type UploadAvatarInput = {
  file: File;

  oldAvatar: string | null;
};

function useUploadAvatar() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, oldAvatar }: UploadAvatarInput) => {
      if (!session) {
        throw new Error("Not authenticated");
      }

      const extension = file.name.split(".").pop();

      if (!extension) {
        throw new Error("Invalid file");
      }

      const newFile = new File(
        [file],

        `${crypto.randomUUID()}-avatar.${extension}`,

        {
          type: file.type,
        },
      );

      const filePath = `${newFile.name}`;

      const { error } = await supabase.storage

        .from("avatars")

        .upload(filePath, newFile);

      if (error) throw error;

      if (oldAvatar) {
        const { error } = await supabase.storage

          .from("avatars")

          .remove([oldAvatar]);
        if (error) throw error;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar: filePath })
        .eq("id", session.user.id);
      if (updateError) throw updateError;

      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onSuccess: () => {
      toast.success("Avatar updated");
    },
    onError: () => {
      toast.success("Error updating the avatar, please try again");
    },
  });
}

export default useUploadAvatar;
