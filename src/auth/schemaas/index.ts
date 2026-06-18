import z from'zod';
export const signupSchema =z
  .object({
    name: z.string(),
    email :z.string().email(),
    password :z.string(),
    cPassword:z.string(),

  })
  .required();

export type signupZodDTO = z.infer< typeof signupSchema>;