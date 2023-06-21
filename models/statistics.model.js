import { getDate, setDate } from 'date-fns'
import sequelize from '../db/database.js'
import { Statuses } from '../db/models/Order.js'
import { getFormatDate } from '../date.js'

export const statisticsSortByFields = {
  ID: 'id',
  NAME: 'name',
  SMALL_ORDERS_COUNT: 'smallOrdersCount',
  MEDIUM_ORDERS_COUNT: 'mediumOrdersCount',
  BIG_ORDERS_COUNT: 'bigOrdersCount',
  COMPLETED_ORDERS_COUNT: 'completedOrdersCount',
  NOT_COMPLETED_ORDERS_COUNT: 'notCompletedOrdersCount',
  RATING: 'rating',
  TOTAL_EARNED: 'totalEarned'
}
export const statisticsSortOptions = ['asc', 'desc']
export const statisticsLimitOptions = [10, 25, 50]

export default {
  getNumberOfOrdersByDate: async (filtersFields, timeZone) => {
    const filters = {
      CITIES: filtersFields?.cityIds?.length,
      MASTERS: filtersFields?.masterIds?.length
    }

    let query = `
        SELECT DATE("startTime" AT TIME ZONE :timeZone) AS "date", COUNT("id") AS "orderCount"
        FROM "orders"
        WHERE "startTime" AT TIME ZONE :timeZone >= :startDate AND "startTime" AT TIME ZONE :timeZone < :endDate 
    `
    const replacements = { timeZone }
    replacements.startDate = getFormatDate(new Date(filtersFields.minMaxDate[0]))
    replacements.endDate = getFormatDate(
      setDate(
        new Date(filtersFields.minMaxDate[1]),
        getDate(new Date(filtersFields.minMaxDate[1])) + 1
      )
    )

    if (filters.CITIES) {
      query += ' AND "cityId" IN (:cityIds)'
      replacements.cityIds = filtersFields.cityIds
    }
    if (filters.MASTERS) {
      query += ' AND "masterId" IN (:masterIds)'
      replacements.masterIds = filtersFields.masterIds
    }
    query += ` GROUP BY "date" ORDER BY "date" ASC`

    const orders = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements
    })

    return orders
  },
  getNumberOfOrdersByCity: async (minMaxDate, timeZone) => {
    let query = `
        SELECT COUNT(o.id) AS "orderCount", c.name AS "cityName"
        FROM orders o
        INNER JOIN cities c ON o."cityId" = c.id
        WHERE "startTime" AT TIME ZONE :timeZone >= :startDate AND "startTime" AT TIME ZONE :timeZone < :endDate 
        GROUP BY c.id, c.name
    `
    const replacements = { timeZone }
    replacements.startDate = getFormatDate(new Date(minMaxDate[0]))
    replacements.endDate = getFormatDate(
      setDate(new Date(minMaxDate[1]), getDate(new Date(minMaxDate[1])) + 1)
    )

    const orders = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements
    })
    return orders
  },
  getNumberOfOrdersByMasters: async (minMaxDate, timeZone) => {
    let query = `
    WITH top_masters AS (
        SELECT m.id
        FROM masters m
        LEFT JOIN orders o ON o."masterId" = m.id
        WHERE "startTime" AT TIME ZONE :timeZone >= :startDate AND "startTime" AT TIME ZONE :timeZone < :endDate 
        GROUP BY m.id
        ORDER BY COUNT(o.id) DESC
        LIMIT 3
      ), other_masters AS (
        SELECT COUNT(*) AS "orderCount"
        FROM orders o
        WHERE "startTime" AT TIME ZONE :timeZone >= :startDate AND "startTime" AT TIME ZONE :timeZone < :endDate 
        AND o."masterId" NOT IN (SELECT id FROM top_masters) 
      )
      SELECT 
        CASE
          WHEN m.id IN (SELECT id FROM top_masters) THEN m.name
          ELSE 'OtherMasters'
        END AS "masterName",
        CASE
          WHEN m.id IN (SELECT id FROM top_masters) THEN (SELECT COUNT(*) FROM orders WHERE "masterId" = m.id AND "startTime" AT TIME ZONE :timeZone  >= :startDate AND "startTime" AT TIME ZONE :timeZone < :endDate )
          ELSE (SELECT "orderCount" FROM other_masters)
        END AS "orderCount"
      FROM masters m
      GROUP BY "masterName", "orderCount"
  `
    const replacements = { timeZone }
    replacements.startDate = getFormatDate(new Date(minMaxDate[0]))
    replacements.endDate = getFormatDate(
      setDate(new Date(minMaxDate[1]), getDate(new Date(minMaxDate[1])) + 1)
    )

    const orders = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements
    })
    return orders
  },
  getMasterStatistics: async (page, limit, sort, sortBy) => {
    const replacements = {
      completedOrderStatus: Statuses.Completed,
      offset: page * limit,
      limit,
      sort,
      sortBy
    }
    const queryRows = `  
    WITH master_statistics AS (
      SELECT m.id, m.name , 
        (
          SELECT COUNT(orders.id) 
          FROM orders 
          LEFT JOIN clocks cl ON cl.id = orders."clockId" 
          WHERE orders."masterId" = m.id 
          AND cl.size = 'Small'
        ) 
        as "smallOrdersCount", 
        (
          SELECT COUNT(orders.id) 
          FROM orders 
          LEFT JOIN clocks cl ON cl.id = orders."clockId" 
          WHERE orders."masterId" = m.id 
          AND cl.size = 'Medium'
        ) 
        as "mediumOrdersCount", 
        (
          SELECT COUNT(orders.id) 
          FROM orders 
          LEFT JOIN clocks cl ON cl.id = orders."clockId" 
          WHERE orders."masterId" = m.id 
          AND cl.size = 'Big'
        ) 
        as "bigOrdersCount", 
        COALESCE(
          (
            SELECT ROUND (AVG(rating), 1) 
            FROM orders 
            WHERE orders."masterId" = m.id
          ),
          0
        ) 
        as "rating",
        (
          SELECT COUNT (orders.id) 
          FROM orders 
          WHERE orders."masterId" = m.id AND orders.status = :completedOrderStatus
        ) 
        as "completedOrdersCount",
        (
          SELECT COUNT (orders.id) 
          FROM orders 
          WHERE orders."masterId" = m.id AND orders.status != :completedOrderStatus
        ) 
        as "notCompletedOrdersCount",
        COALESCE(
          (
            SELECT SUM (orders.price) 
            FROM orders 
            WHERE orders."masterId" = m.id AND orders.status = :completedOrderStatus
          ),
          0
        ) 
        as "totalEarned"
      FROM masters m 
    )
    SELECT * FROM master_statistics
    ORDER BY "${sortBy}" ${sort}
    LIMIT :limit
    OFFSET :offset
`

    const queryCount = `SELECT COUNT(id) FROM masters`

    const rows = await sequelize.query(queryRows, {
      type: sequelize.QueryTypes.SELECT,
      replacements
    })
    const [count] = await sequelize.query(queryCount, {
      type: sequelize.QueryTypes.SELECT
    })
    return { rows, count: +count.count }
  }
}
