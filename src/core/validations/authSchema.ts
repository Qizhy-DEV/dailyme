import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type SignInFormValues = yup.InferType<typeof signInSchema>;

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(6, "Full name must be at least 6 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type signUpFormValues = yup.InferType<typeof signUpSchema>;
