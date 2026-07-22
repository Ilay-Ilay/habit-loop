import { Button } from "../../../components/ui/button";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginCredentials } from "../../../types/schema";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Link } from "react-router-dom";
import { Separator } from "../../../components/ui/separator";
import { Spinner } from "../../../components/ui/spinner";
import useLogin from "../../../hooks/useLogin";

function LoginForm() {
  const { handleSubmit, control } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, error } = useLogin();

  function handleFormSubmit(data: LoginCredentials) {
    if (isPending) return;
    mutate(data);
  }

  return (
    <div className="w-full sm:max-w-[30%] flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-5xl font-medium">Welcome back</h1>

        <span className="text-muted-foreground text-sm">
          Sign in to your account
        </span>
      </div>
      <div>
        <form id="login-form" onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            {error && (
              <Field>
                <FieldError errors={[{ message: error.message }]} />
              </Field>
            )}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-email-input">Email</FieldLabel>
                    <Input
                      {...field}
                      id="login-email-input"
                      placeholder="Email"
                      type="email"
                      required
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between items-center">
                      <FieldLabel htmlFor="login-password-input">
                        Password
                      </FieldLabel>
                      <Button variant={"link"}>
                        <Link
                          className="text-muted-foreground"
                          to="/forgot_password"
                        >
                          Forgot Password?
                        </Link>
                      </Button>
                    </div>
                    <Input
                      {...field}
                      id="login-passowrd-input"
                      placeholder="Password"
                      type="password"
                      required
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Field>
              <Button disabled={isPending} type="submit">
                {isPending && <Spinner />}Sign in
              </Button>
            </Field>
            <Separator />
            <Field>
              <Button variant={"outline"}>Continue with Google</Button>
            </Field>
            <Field>
              <FieldDescription>
                <span>Don't have an account? </span>
                <Link to="/sign_up">Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
