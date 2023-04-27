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

  const stats = data.map((item) => {
    return {
      date: item.date,
      name: item.name,
      symbol: item.symbol,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close
    }
  })

  return stats
}

const addHistory = async (userId: number, data: UserHistoryResponse): Promise<void> => {
  await client.userHistory.create({
    data: {
      ...data,
      user: {
        connect: { id: userId }
      }
    }
  })
}

export const provider = {
  ...client.userHistory,
  getStats,
  getHistory,
  addHistory
}
