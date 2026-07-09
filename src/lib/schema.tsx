import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().trim().min(2, "Minimum 2 characters"),
  lastName: z.string().trim().min(2, "Minimum 2 characters"),
  email: z.email("Enter a valid email."),
  phone: z
    .string()
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Must have at least digits.",
    ),
  postalCode: z.string().trim().min(2, "Minimum 2 characters"),
});

export const signInSchema = z.object({
  email: z.email("Enter a valid email."),
  password: z.string().trim().min(2, "Minimum 2 characters"),
});

export const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Minimum 2 characters"),
  email: z.email("Enter a valid email."),
  password: z.string().trim().min(2, "Minimum 2 characters"),
  confirmPassword: z.string().trim().min(2, "Minimum 2 characters"),
});

export type InformationForm = z.infer<typeof employeeSchema>;
export type SignInInfoForm = z.infer<typeof signInSchema>;
export type SignUpInfoForm = z.infer<typeof signUpSchema>;
