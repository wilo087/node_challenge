import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

router.get('/:stock_code', (req: Request, res: Response, _next: NextFunction) => {
  res.send(`Stock endpoint params: ${JSON.stringify(req.params.stock_code)}`)
})

export default router
