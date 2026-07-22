import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "../../../types/schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import useChangePassword from "../../../hooks/useChangePassword";
import { Spinner } from "../../../components/ui/spinner";
import { useState } from "react";

function AccountPassword() {
  const { handleSubmit, control } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old: "",
      new: "",
      confirm: "",
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate: changePassword, isPending, error } = useChangePassword();

  const handleFormSubmit = (data: ChangePasswordSchema) => {
    if (isPending) return;
    changePassword(data, { onSuccess: () => setDialogOpen(false) });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">Account security</h3>
      <div className="bg-card border border-border rounded-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-1">
            <span>Password</span>
            <span className="text-sm text-muted-foreground">
              Change the password you use to log in
            </span>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              render={<Button variant={"secondary"}>Change password</Button>}
            />
            <DialogContent>
              <DialogHeader className="text-xl font-medium text-center">
                Change password
              </DialogHeader>
              <DialogDescription className={"text-center"}>
                Password should be at least 15 characters or at least 8
                characters including a number and a lowercase letter.
              </DialogDescription>
              <form
                id="change-password-form"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <FieldGroup className="mt-4">
                  {error && error.message === "OLD_PASSWORD_INCORRECT" && (
                    <Field>
                      <FieldError>
                        We couldn’t verify your current password
                      </FieldError>
                    </Field>
                  )}
                  {error &&
                    error.message === "PASSWORDS_SHOULD_BE_DIFFERENT" && (
                      <Field>
                        <FieldError>
                          New password should be different from the old password
                        </FieldError>
                      </Field>
                    )}
                  <Controller
                    control={control}
                    name="old"
                    render={({ field, fieldState }) => (
                      <Field className="gap-1">
                        <FieldLabel className="font-xs">
                          Old password
                        </FieldLabel>

                        <Input
                          {...field}
                          type="password"
                          placeholder="Old password"
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    control={control}
                    name="new"
                    render={({ field, fieldState }) => (
                      <Field className="gap-1">
                        <FieldLabel className="font-xs">
                          New password
                        </FieldLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="New password"
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    control={control}
                    name="confirm"
                    render={({ field, fieldState }) => (
                      <Field className="gap-1">
                        <FieldLabel className="font-xs">
                          Confirm password
                        </FieldLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm password"
                        />
                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Field>
                    <Button size="lg" type="submit">
                      {isPending && <Spinner />}Change password
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default AccountPassword;
