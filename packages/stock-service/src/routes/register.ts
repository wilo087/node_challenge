import express, { Request, Response, NextFunction } from 'express'
import db from '@stock/db'

const router = express.Router()
// const dba = db.createClient()

router.post('/', (_req: Request, res: Response, _next: NextFunction) => {
  db.User.create({
    data: {
      name: 'John Doe',
      role: 'ADMIN',
      email: 'wilo0087@gmail.com',
      password: '123456'
    }
  }).then((user: any) => {
    res.json(user)
  }).catch((err: any) => {
    res.json(err)
  })

  // res.send('This is the user creation endpoint')
})

export default router
