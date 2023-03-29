import { z } from 'zod'

export const addOrderSchema = z.object({
  masterId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  name: z.string().max(255).nonempty(),
  email: z.string().email().nonempty(),
  size: z.string().max(255).nonempty(),
  city: z.string().max(255).nonempty(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
})
export const getEndOrderDateSchema = z.object({
  size: z.string().max(255).nonempty(),
  startTime: z.coerce.date()
})
export const getOrderByIdSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const editOrderSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  size: z.string().max(255).nonempty(),
  master: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  start: z.coerce.date(),
  end: z.coerce.date()
})
export const delOrderSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
