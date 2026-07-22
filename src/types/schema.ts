import { z } from "zod";

export const emailSchema = z

  .string()

  .trim()

  .email("Enter a valid email");

export const passwordSchema = z

  .string()

  .min(8, "Password must be at least 8 characters")

  .max(16, "Password must be at most 16 characters")

  .regex(/[A-Z]/, "Must contain at least one uppercase letter")

  .regex(/[a-z]/, "Must contain at least one lowercase letter")

  .regex(/[0-9]/, "Must contain at least one number");

// LOGIN SCHEMA

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

// SIGN UP SCHEMA

export const signUpSchema = z.object({
  email: emailSchema,

  password: passwordSchema,

  // confirmPassword: passwordSchema,
});

//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",

//     path: ["confirmPassword"],
//   });

export type SignUpCredentials = z.infer<typeof signUpSchema>;

// CREATE SCHEMA

export const createHabitSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(40, "Habit name must be 40 characters or fewer."),

  color: z.string().min(1, "Choose a color"),
});

// FORGOT PASSWORD

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordCredentials = z.infer<typeof forgotPasswordSchema>;

//  PROFILE INFO SCHEMA

export const profileInfoSchema = z.object({
  name: z

    .string()

    .trim()

    .max(50, "First name must be less than 50 characters")
    .optional()

    .or(z.literal("")),

  last_name: z

    .string()

    .trim()

    .max(50, "Last name must be less than 50 characters")

    .optional()

    .or(z.literal("")),
});

export type ProfileInfoFormData = z.infer<typeof profileInfoSchema>;

//  CHANGE PASSWORD SCHEMA

export const changePasswordSchema = z

  .object({
    old: passwordSchema,

    new: passwordSchema,

    confirm: passwordSchema,
  })

  .refine((data) => data.new === data.confirm, {
    message: "Passwords do not match",

    path: ["confirm"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

// RESET PASSWORD SCHEA

export const resetPasswordSchema = z
  .object({
    new: passwordSchema,
    confirm: passwordSchema,
  })
  .refine((data) => data.new === data.confirm, {
    message: "Passwords do not match",

    path: ["confirm"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
