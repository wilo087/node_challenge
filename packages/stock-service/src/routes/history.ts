import express, { Response, NextFunction } from 'express'
import { auth } from '../middleware/auth'
import { AuthenticatedRequest } from '../types'
import db from '@stock/db'
const router = express.Router()

router.get('/', auth, async (_req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
  // res.send('History endpoint')
  const id = _req.user?.userId
  const response = await db.UserHistory.findMany({
    where: {
      userId: {
        equals: id
      }
    },
    select: {
      date: true,
      name: true,
      symbol: true,
      open: true,
      high: true,
      low: true,
      close: true
    },
    orderBy: {
      date: 'desc'
    },
    take: 20
  })
  console.log(response)
  res.json(response)
})

export default router
