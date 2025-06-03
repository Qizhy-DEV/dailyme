import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  level: yup
    .string()
    .oneOf(["easy", "medium", "hard"], "Level must be easy, medium, or hard")
    .required("Level is required"),
  subtitle: yup.string().required("Subtitle is required"),
});

export type TaskFormValues = yup.InferType<typeof taskSchema>;
