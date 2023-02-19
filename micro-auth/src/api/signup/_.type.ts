import z from 'zod'
import { db } from '../../db'

export const Signup = z.object({
  email: z.string().min(12),
  password: z.string().min(4),
  confirm: z.string().min(4)
})

export type ISignup = z.infer<typeof Signup>
// export const Users = db.insertOne<ISignup>()

// export type 