import express from 'express'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { auth } from '../../middleware/auth'

import { history } from '../../routes'
import { config } from '../../config'

const app = express()
app.use('/history', auth, history)
app.use(express.json())

const fakeToken = jwt.sign({ userId: 1 }, config.secret, { expiresIn: '24h' })

const mockHistory = [{
  "date": "2023-04-26T17:10:34.927Z",
  "name": "APPLE",
  "symbol": "AAPL.US",
  "open": 163.055,
  "high": 165.28,
  "low": 162.8,
  "close": 164.3309
}]

jest.mock('@stock/db', () => ({
  UserHistory: {
    getHistory: jest.fn(async () => await Promise.resolve(mockHistory))
  },
  User: {
    findUnique: jest.fn(async () => await Promise.resolve({ role: 'user', id: 1 }))
  }
}))

describe('GET /history', () => {
  it('should respond with status 401 when user is not authenticated', async () => {
    const res = await request(app).get('/history')
    expect(res.status).toBe(401)
  })

  it('should respond with status 200', async () => {
    const res = await request(app).get('/history').set('Authorization', `Bearer ${fakeToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(mockHistory)
  })
})
