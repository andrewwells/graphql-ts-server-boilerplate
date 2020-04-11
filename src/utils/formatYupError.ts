import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
  const errors = err.inner.map((e) => {
    return { path: e.path, message: e.message };
  });
  return errors;
};
