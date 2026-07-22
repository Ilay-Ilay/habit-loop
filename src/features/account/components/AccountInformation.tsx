import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  profileInfoSchema,
  type ProfileInfoFormData,
} from "../../../types/schema";
import type { Profile } from "../../../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../../providers/AuthContext";
import { Button } from "../../../components/ui/button";
import useUpdateProfile from "../../../hooks/useUpdateProfile";
import { Spinner } from "../../../components/ui/spinner";
import { useEffect } from "react";
type AccountInformationProps = {
  profile: Profile | null;
  isLoading: boolean;
};

function AccountInformation({ profile }: AccountInformationProps) {
  const { mutate: update, isPending } = useUpdateProfile();
  const { session } = useAuth();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<ProfileInfoFormData>({
    resolver: zodResolver(profileInfoSchema),

    defaultValues: {
      name: "",

      last_name: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name ?? "",

        last_name: profile.last_name ?? "",
      });
    }
  }, [profile, reset]);

  function handleFormSubmit(data: ProfileInfoFormData) {
    update(data, {
      onSuccess: () => {
        reset(data);
      },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">Profile information</h3>
      <div className="bg-card border border-border rounded-lg">
        <form onSubmit={handleSubmit(handleFormSubmit)} id="profile-info-form">
          <FieldGroup className="p-4">
            <Field>
              <FieldLabel htmlFor="profile-email-input">Email</FieldLabel>
              <Input
                value={session?.user.email}
                disabled
                id="profile-email-input"
              />
            </Field>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="first-name-input">First name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="First Name"
                    id="first-name-input"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="last_name"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="last-name-input">Last name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Last Name"
                    id="last-name-input"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <div className="p-4 border-t border-border flex items-center justify-end gap-2">
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => reset()}
            size="lg"
            disabled={!isDirty || isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="profile-info-form"
            size="lg"
            disabled={!isDirty || isPending}
          >
            {isPending && <Spinner />}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccountInformation;
