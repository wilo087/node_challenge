import { createClient } from '@stock/db/src/client'
import { UserHistoryResponse } from '@stock/db/types'

const client = createClient()

const getStats = async (): Promise<UserHistoryResponse[]> => {
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
    take: 5
  })

  const stats = response.map((item) => {
    return {
      stock: item.symbol,
      times_requested: item._count.symbol
    }
  })

  return stats
}

export const provider = {
  ...client.userHistory,
  getStats
}
