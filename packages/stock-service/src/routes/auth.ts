import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from '@stock/db'
import { config } from '../config'

dotenv.config()
const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await db.User.findUnique({ where: { email } })

    if (user === null) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
      res.status(401).json({ message: 'Invalid password' })
      return
    }

    const token = jwt.sign({ userId: user.id }, config.secret, { expiresIn: '24h' })
    res.json({ token })
  } catch (err: any) {
    console.log(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
