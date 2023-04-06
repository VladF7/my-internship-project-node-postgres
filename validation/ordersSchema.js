import { z } from 'zod'

export const addOrderSchema = z.object({
  masterId: z.number().int().positive(),
  clockId: z.number().int().positive(),
  cityId: z.number().int().positive(),
  name: z.string().max(255).nonempty(),
  email: z.string().email().nonempty(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  priceForHour: z.number().int().positive(),
  price: z.number().int().positive()
})
export const getOrderEndTimeSchema = z.object({
  clockId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
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
  cityId: z.number().int().positive(),
  clockId: z.number().int().positive(),
  masterId: z.number().int().positive(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  priceForHour: z.number().int().positive(),
  price: z.number().int().positive(),
  statusId: z.number().int().positive()
})
export const deleteOrderSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
