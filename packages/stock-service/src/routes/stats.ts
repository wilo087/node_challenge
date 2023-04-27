import express, { Request, Response } from 'express'
import db from '@stock/db'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, (_req: Request, res: Response) => {
  if (res.locals.user.role !== 'admin') {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  db.UserHistory.getStats(5)
    .then(stats => res.json(stats))
    .catch(_err => res.status(500).json({ message: 'Internal server error' }))
})

export default router
