import express, { Response } from 'express'
import { auth } from '../middleware/auth'
import { AuthenticatedRequest } from '../types'
import db from '@stock/db'

const router = express.Router()

router.get('/', auth, (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.user ?? { userId: 0 }

  db.UserHistory.getHistory(userId)
    .then(history => res.json(history))
    .catch(_err => res.status(500).json({ message: 'Internal server error' }))
})

export default router
