import { useEffect, useRef, useState } from "react";
import type { Profile } from "../../../types/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { supabase } from "../../../types/supabase-client";
import useAuth from "../../../providers/AuthContext";
import useUploadAvatar from "../../../hooks/useUploadAvatar";

import { Button } from "../../../components/ui/button";
import { Image, Upload, X } from "lucide-react";
import { Spinner } from "../../../components/ui/spinner";

type AccountAvatarProps = {
  profile: Profile | null;
};

function AccountAvatar({ profile }: AccountAvatarProps) {
  const { session } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate: uploadAvatar, isPending } = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    const url = URL.createObjectURL(selectedFile);

    setPreview(url);
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleUpload() {
    if (!file) return;
    if (isPending) return;
    uploadAvatar(
      { file, oldAvatar: profile?.avatar || null },
      {
        onSuccess: () => {
          setFile(null);

          setPreview(null);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
      },
    );
  }
  if (!profile) return null;
  const avatarUrl = profile.avatar
    ? supabase.storage

        .from("avatars")

        .getPublicUrl(profile.avatar).data.publicUrl
    : null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">Profile avatar</h3>
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 flex gap-4 items-center">
          <Avatar className="h-14 w-14 shrink-0 rounded-full overflow-hidden">
            <AvatarImage
              className="h-full w-full object-cover"
              alt="User avatar"
              src={preview ?? avatarUrl ?? undefined}
            />

            <AvatarFallback className="rounded-full">
              {session?.user.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="avatar-upload"
          />

          <label
            htmlFor="avatar-upload"
            className="flex items-center gap-2 cursor-pointer border border-border p-4 rounded-lg w-full turncate text-muted-foreground"
          >
            <Image size={16} className="text-muted-foreground" />

            {file ? file.name : "Upload avatar"}
          </label>
        </div>
        <div className="p-4 border-t border-border w-full flex items-center justify-end gap-2">
          {file && (
            <Button
              variant={"secondary"}
              size="lg"
              disabled={!file || isPending}
              onClick={() => {
                setFile(null);
                setPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              <X />
              Clear
            </Button>
          )}
          <Button
            variant={file ? "default" : "secondary"}
            size="lg"
            disabled={!file}
            onClick={handleUpload}
          >
            {isPending ? <Spinner /> : <Upload />}
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccountAvatar;
