import z from 'zod'

export const SignIn = z.object({
  email: z.string().email().min(12),
  password: z.string().min(4)
});

export type ISignIn = z.infer<typeof SignIn>
