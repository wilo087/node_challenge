import express, { Response } from 'express'
import { auth } from '../middleware/auth'
import { AuthenticatedRequest } from '../types'
import db from '@stock/db'

const router = express.Router()

router.get('/', auth, async (req: AuthenticatedRequest, res: Response) => {
  const { userRole } = req.user ?? { userRole: 'user' }

  if (userRole !== 'admin') {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const stats = await db.UserHistory.getStats()

  res.json(stats)
})

export default router
