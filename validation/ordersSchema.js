import { z } from 'zod'
import {
  limitOptions,
  sortByFields,
  sortOptions,
  statusFilterOptions
} from '../models/orders.model.js'

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png']
const MAX_FILES_COUNT = 5

export const addOrderSchema = z.object({
  masterId: z.number().int().positive(),
  clockId: z.number().int().positive(),
  cityId: z.number().int().positive(),
  name: z.string().max(255).nonempty(),
  email: z.string().email().nonempty(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  priceForHour: z.number().int().positive(),
  price: z.number().int().positive(),
  images: z
    .array(
      z.string().superRefine((dataUrl, ctx) => {
        const arr = dataUrl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const data = arr[1]
        if (!ACCEPTED_IMAGE_TYPES.includes(mime)) {
          {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Only .jpeg and .png formats are supported.'
            })
          }
        }
        if (Buffer.byteLength(data, 'base64') > MAX_FILE_SIZE) {
          {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Image size must not exceed 1 MB'
            })
          }
        }
      })
    )
    .max(MAX_FILES_COUNT)
    .optional()
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
  status: z.string().max(255).nonempty(),
  deletedImages: z.array(z.string()).max(5).optional()
})
export const deleteOrderSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const completeOrderSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const setRatingSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  rating: z.number().gte(1).lte(5).int().positive()
})
export const getOrdersForMasterByIdSchema = z.object({
  masterId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const getOrdersForCustomerByIdSchema = z.object({
  customerId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const getOrdersSchema = z.object({
  page: z.number().int().nonnegative().default(0),
  limit: z.nativeEnum(limitOptions),
  sort: z.nativeEnum(sortOptions),
  sortBy: z.nativeEnum(Object.values(sortByFields)),
  filtersFields: z.object({
    masters: z.array(z.number().int().positive()).optional(),
    cities: z.array(z.number().int().positive()).optional(),
    status: z.nativeEnum(statusFilterOptions).optional(),
    minMaxDate: z.array(z.coerce.date().nullable()).optional(),
    minMaxPrice: z.array(z.number().int().positive()).optional()
  })
})
