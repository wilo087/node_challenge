import express, { Response } from 'express'
import { config } from '../config'
import { auth } from '../middleware/auth'
import { AuthenticatedRequest } from '../types'
import db from '@stock/db'
import { Stock } from '../../../stock-api/src/types'
const router = express.Router()

router.get('/:code', auth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId
  const { code } = req.params

  try {
    const response = await fetch(`${config.stockApiUrl}/stock/${code}`)

    if (response.status === 404) {
      res.status(404).json({ message: 'Stock not found, here is the stock list available https://stooq.com/t/?i=518' })
      return
    }

    const data: Stock = await response.json()
    await db.UserHistory.create({
      data: {
        ...data,
        user: {
          connect: { id: userId }
        }
      }
    })

    res.json(data)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
