import { z } from 'zod'

export const getClockByIdSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
