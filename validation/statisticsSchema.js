import { z } from 'zod'
import {
  statisticsLimitOptions,
  statisticsSortByFields,
  statisticsSortOptions
} from '../models/statistics.model.js'
export const getNumberOfOrdersByDateSchema = z.object({
  filters: z.object({
    cityIds: z.array(z.number().int().positive()).optional(),
    masterIds: z.array(z.number().int().positive()).optional(),
    minMaxDate: z.array(z.coerce.date())
  }),
  timezone: z.string().nonempty()
})
export const getNumberOfOrdersSchema = z.object({
  minMaxDate: z.array(z.coerce.date()),
  timezone: z.string().nonempty()
})
export const getMasterStatisticsSchema = z.object({
  page: z.number().int().nonnegative().default(0),
  limit: z.nativeEnum(statisticsLimitOptions),
  sort: z.nativeEnum(statisticsSortOptions),
  sortBy: z.nativeEnum(Object.values(statisticsSortByFields))
})
