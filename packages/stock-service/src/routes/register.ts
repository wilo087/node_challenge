import express, { Request, Response } from 'express'
import randomstring from 'randomstring'
import db from '@stock/db'
// import { UserReturnInput } from '@stock/db/src/types'
// import { UserReturnInput } from '@stock/db/src/types'

const router = express.Router()

router.post('/', (req: Request, res: Response) => {
  // TODO: validate the request
  const { email, role } = req.body
  const password = randomstring.generate(32)

  // TODO: Create a provider for find or create user
  db.User
    .findUnique({ where: { email } })
    .then((user: any) => {
      if (user !== null) {
        res
          .status(409)
          .json({ message: 'User already exists' })
        return
      }

      db.User.create({
        data: { role, email, password }
      }).then((user: any) => {
        res.json({ email: user.email, password })
      }).catch((err: Error) => {
        res.json(err)
      })
    }).catch((err: Error) => {
      res.json({ err })
    })
})

export default router
