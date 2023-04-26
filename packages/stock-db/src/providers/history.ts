import { createClient } from '@stock/db/src/client'
import { UserHistoryResponse, UserStatsResponse } from '@stock/db/types'

const client = createClient()

const getStats = async (limit: number = 5): Promise<UserStatsResponse[]> => {
  const response = await client.userHistory.groupBy({
    by: ['symbol'],
    _count: {
      symbol: true
    },
    orderBy: {
      _count: {
        symbol: 'desc'
      }
    },
    take: limit
  })

  const stats = response.map((item) => {
    return {
      stock: item.symbol,
      times_requested: item._count.symbol
    }
  })

  return stats
}

const getHistory = async (userId: number, limit: number = 20): Promise<UserHistoryResponse[]> => {
  const data = await client.userHistory.findMany({
    where: {
      userId: {
        equals: userId
      }
    },
    orderBy: {
      date: 'desc'
    },
    take: limit
  })

  return data
}

export const provider = {
  ...client.userHistory,
  getStats,
  getHistory
}
