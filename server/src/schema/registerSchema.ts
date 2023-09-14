import * as yup from 'yup';

export const registerSchema = yup.object({
  firstname: yup.string().trim().required(),
  lastname: yup.string().trim().required(),
  email: yup.string().email().trim().required(),
  password: yup.string().min(4).required(),
});

export type ValidationSchemaType<T> = yup.Schema<T>;
