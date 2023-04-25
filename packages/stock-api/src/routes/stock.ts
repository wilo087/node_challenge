import express, { Request, Response } from 'express'
import { getStock } from '../services'

const router = express.Router()

router.get('/:code', async (req: Request, res: Response) => {
  const { code } = req.params

  try {
    const stock = await getStock(code)
    if (stock === null) {
      res.status(404).json({ message: 'Stock not found' })
      return
    }

    res.json(stock)
    return
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
