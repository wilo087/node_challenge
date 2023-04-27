import express, { Request, Response } from 'express'
import db from '@stock/db'

const router = express.Router()

router.post('/', (req: Request, res: Response) => {
  const { email, role } = req.body

  db.User.findOrCreate(email, role)
    .then((user: any) => {
      if (user.password === undefined) {
        res.status(500).json({ message: 'User name already exist' })
        return
      }

      res.json(user)
    })
    .catch((err: Error) => res.json(err))
})

export default router
