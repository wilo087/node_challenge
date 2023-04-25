import express, { Response } from 'express'
import { auth } from '../middleware/auth'
import { AuthenticatedRequest } from '../types'

const router = express.Router()

router.get('/', auth, (req: AuthenticatedRequest, res: Response) => {
  const { userRole } = req.user ?? { userRole: 'user' }

  if (userRole !== 'admin') {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  res.json({ message: 'Hello from stats', user: req.user })
})

export default router
