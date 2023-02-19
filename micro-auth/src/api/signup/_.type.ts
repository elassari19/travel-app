import z from 'zod'

export const Signup = z.object({
  email: z.string().min(12),
  password: z.string().min(4),
  confirm: z.string().min(4)
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
});

export type ISignup = z.infer<typeof Signup>
