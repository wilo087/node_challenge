import express, { Response } from 'express'
import { auth } from '../middleware/auth'
import { AuthenticatedRequest } from '../types'
const router = express.Router()

router.get('/', auth, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'Hello from stats', user: req.user, userRole: req.userRole })
})

export default router
