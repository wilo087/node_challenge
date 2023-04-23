import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

router.post('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.send('This is the user creation endpoint')
})

export default router
