import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from '@stock/db'
import { config } from '../config'
import { UserJwtPayload } from '../types'

dotenv.config()

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]

  if (token === undefined) {
    res.status(401).json({ error: 'Make sure that you are sending correct authorization on the headers' })
    return
  }

  jwt.verify(token, config.secret, async (err: Error | null, decoded: UserJwtPayload | any) => {
    if (err != null) {
      res.status(401).json({ error: 'Invalid token' })
      return
    }

    const user = await db.User.findUnique({ where: { id: decoded?.userId as number } })
    if (user === null) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.locals.user = { id: user.id, role: user.role }
    next()
  })
}
