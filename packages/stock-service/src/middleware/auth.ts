import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { config } from '../config'
import { AuthenticatedRequest } from '../types'

dotenv.config()

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]

  if (token === undefined) {
    res.status(401).json({ error: 'Make sure that you are sending correct authorization on the headers' })
    return
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err != null) {
      res.status(401).json({ error: 'Invalid token' })
      return
    }

    req.userRole = 'user'
    req.user = decoded
    next()
  })
}
