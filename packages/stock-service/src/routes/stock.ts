import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.send('Stock endpoint')
})

export default router
