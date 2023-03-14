import z from 'zod'

export const ReSendEamil = z.object({
  email: z.string().email().min(12)
});

export type IReSend = z.infer<typeof ReSendEamil>
