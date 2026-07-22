import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../../../types/schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { RectangleEllipsis } from "lucide-react";
import useResetPassword from "../../../hooks/useResetPassword";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../components/ui/spinner";
import useAuth from "../../../providers/AuthContext";

function ResetPasswordForm() {
  const { mutate: resetPassword, isPending, error } = useResetPassword();
  const { setRecovery } = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new: "",
      confirm: "",
    },
  });

  function handleFormSubmit(data: ResetPasswordSchema) {
    resetPassword(data.new, {
      onSuccess: () => {
        setRecovery(false);
        navigate("/account", { replace: true });
      },
    });
  }
  return (
    <form
      className="w-full sm:max-w-100 flex flex-col gap-8 border border-border rounded-lg p-8"
      id="reset-password-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-2 text-center items-center">
        <RectangleEllipsis className="text-muted-foreground" />
        <h1 className="text-3xl font-semibold">Reset password</h1>
        <span className="text-muted-foreground text-sm">
          Password should be at least 15 characters or at least 8 characters
          including a number and a lowercase letter.
        </span>
      </div>
      <FieldGroup className="gap-4">
        <Field>{error && <FieldError>{error.message}</FieldError>}</Field>
        <Controller
          control={control}
          name="new"
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="new-password-input">
                  New password
                </FieldLabel>
                <Input
                  id="new-password-input"
                  placeholder="New password"
                  type="password"
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
        <Controller
          control={control}
          name="confirm"
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirm-new-password-input">
                  Confirm
                </FieldLabel>
                <Input
                  type="password"
                  id="confirm-new-password-input"
                  placeholder="Confirm password"
                  {...field}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner />}
            {isPending ? "Updating..." : "Update Password"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default ResetPasswordForm;
