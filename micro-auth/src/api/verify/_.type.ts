import z from 'zod'

export const Verify = z.object({
  id: z.string().email().min(12),
  verification: z.string().min(12)
});

export type IVerify = z.infer<typeof Verify>
