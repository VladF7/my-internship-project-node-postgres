import { z } from 'zod'
import { limitOptions, sortByFields, sortOptions } from '../models/masters.model.js'

export const getFreeMastersSchema = z.object({
  cityId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  email: z.string().email().nonempty()
})
export const getFreeMastersForCurrentOrder = z.object({
  orderId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  cityId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
})
export const getMasterByIdSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const editMasterSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  name: z.string().max(255).nonempty(),
  cities: z.array(z.number().int().positive())
})
export const deleteMasterSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const activateMasterSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const resetPasswordSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const getRatingForMasterSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const getMastersSchema = z.object({
  page: z
    .string()
    .regex(/^[0-9]\d*$/)
    .transform(Number)
    .default('0'),
  limit: z.nativeEnum(limitOptions),
  sort: z.nativeEnum(sortOptions),
  sortBy: z.nativeEnum(Object.values(sortByFields))
})
