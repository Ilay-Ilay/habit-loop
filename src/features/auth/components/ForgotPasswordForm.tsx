import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordCredentials,
} from "../../../types/schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import useResetRequest from "../../../hooks/useResetRequest";

function ForgotPasswordForm() {
  const { handleSubmit, control } = useForm<ForgotPasswordCredentials>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate, isPending } = useResetRequest();

  function handleFormSubmit(data: ForgotPasswordCredentials) {
    if (isPending) return;
    mutate(data);
  }

  return (
    <form
      className="w-full sm:max-w-100 flex flex-col gap-8 border border-border rounded-lg p-8"
      id="forgot-password-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold">Forgot your password?</h1>
        <span className="text-muted-foreground text-sm">
          Enter your email and we'll send you a code to reset
        </span>
      </div>
      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
                <Input {...field} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />
        <Field>
          <Button type="submit" size="lg">
            Send reset code
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default ForgotPasswordForm;
