import { z } from 'zod'

export const getFreeMastersSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
    .optional(),
  city: z.string().max(255).nonempty(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
})
export const getMasterByIdSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const addMasterSchema = z.object({
  name: z.string().max(255).nonempty(),
  rating: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  cities: z.array(
    z
      .string()
      .regex(/^[1-9]\d*$/)
      .transform(Number)
  )
})

export const editMasterSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  name: z.string().max(255).nonempty(),
  rating: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  cities: z.array(
    z
      .string()
      .regex(/^[1-9]\d*$/)
      .transform(Number)
  )
})
