import express, { Request, Response } from 'express'
import db from '@stock/db'
import { UserHistoryResponse } from '@stock/db/types'
import { config } from '../config'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/:code', auth, async (req: Request, res: Response) => {
  const { code } = req.params

  try {
    const response = await fetch(`${config.stockApiUrl}/stock/${code}`)

    if (response.status === 404) {
      res.status(404).json({ message: 'Stock not found, here is the available stock list https://stooq.com/t/?i=518' })
      return
    }

    const data: UserHistoryResponse = await response.json()
    await db.UserHistory.addHistory(res.locals.user.id, data)

    res.json(data)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
