import express, { Response } from 'express'
import { auth } from '../middleware/auth'
import { AuthenticatedRequest } from '../types'
import db from '@stock/db'

const router = express.Router()

router.get('/', auth, (req: AuthenticatedRequest, res: Response) => {
  const { userRole } = req.user ?? { userRole: 'user' }

  if (userRole !== 'admin') {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  db.UserHistory.getStats(5)
    .then(stats => res.json(stats))
    .catch(_err => res.status(500).json({ message: 'Internal server error' }))
})

export default router
