import { Button } from "../../../components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpCredentials } from "../../../types/schema";
import { Spinner } from "../../../components/ui/spinner";
import { Separator } from "../../../components/ui/separator";
import { Link } from "react-router-dom";
import useSignUp from "../../../hooks/useSignUp";

function SignupForm() {
  const { mutate: signup, isPending, error } = useSignUp();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handler = (data: SignUpCredentials) => {
    if (isPending) return;
    signup(data);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="flex flex-col gap-10 flex-1 max-w-96">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-5xl font-medium">Get started</h1>
          <span className="text-muted-foreground text-sm">
            Fill information below to create your account
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <form id="sign-up-form" onSubmit={handleSubmit(handler)}>
            <FieldGroup>
              {error && (
                <Field>
                  <FieldError errors={[{ message: error.message }]} />
                </Field>
              )}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email-sign-up">Email</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Email"
                        id="email-sign-up"
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
                      <FieldLabel htmlFor="password-sign-up">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="Password"
                        id="password-sign-up"
                        type="password"
                        required
                      />
                      <FieldDescription>
                        Password should be at least 15 characters OR at least 8
                        characters including a number and a lowercase letter.
                      </FieldDescription>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
              <Field>
                {" "}
                <Button
                  disabled={isPending}
                  type="submit"
                  variant={"default"}
                  className="w-full"
                  size={"lg"}
                  form="sign-up-form"
                >
                  {isPending && <Spinner />}
                  Create account
                </Button>
              </Field>
              <Separator />
              <Field>
                {" "}
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isPending}
                >
                  Continue with Google
                </Button>
              </Field>
              <Field>
                <FieldDescription>
                  <span>Already have an account? </span>
                  <Link to="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
