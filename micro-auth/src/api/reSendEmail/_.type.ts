import z from 'zod'

export const ReSend = z.object({
  email: z.string().email().min(12)
});

export type IReSend = z.infer<typeof ReSend>
