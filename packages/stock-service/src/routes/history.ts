import express, { Request, Response } from 'express'
import db from '@stock/db'
import { auth } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, (_req: Request, res: Response) => {
  db.UserHistory.getHistory(res.locals.user.id)
    .then((history) => res.json(history))
    .catch((_err) => res.status(500).json({ message: 'Internal server error' }))
})

export default router
