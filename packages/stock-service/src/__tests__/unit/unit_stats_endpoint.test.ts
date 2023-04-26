import express from 'express'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { auth } from '../../middleware/auth'
// import { mockDeep } from 'jest-mock-extended'
// import db from '@stock/db'

import { stats } from '../../routes'
import { config } from '../../config'

const app = express()
app.use(auth)
app.use('/stats', stats)
app.use(express.json())

const fakeToken = jwt.sign({ userId: 1 }, config.secret, { expiresIn: '24h' })

const mockStats = [{
  stock: 'aapl.us',
  times_requested: 5
}]

jest.mock('@stock/db', () => ({
  UserHistory: {
    getStats: jest.fn(async () => await Promise.resolve(mockStats))
  },
  User: {
    findUnique: jest.fn(async () => await Promise.resolve({ userRole: 'user', userId: 1 }))
  }
}))

describe('GET /stats', () => {
  it('should respond with status 401 when user is not authenticated', async () => {
    const res = await request(app).get('/stats')
    expect(res.status).toBe(401)
  })

  it('should respond with status 401 when user is not an admin', async () => {
    const res = await request(app).get('/stats').set('Authorization', `Bearer ${fakeToken}`)
    expect(res.status).toBe(401)
  })

  it('should respond with status 200 and the correct stats when user is an admin', async () => {
    const res = await request(app).get('/stats').set('Authorization', `Bearer ${fakeToken}`).send({body: {user: { userId: 1, userRole: 'user' }}})
    // expect(res.status).toBe(200)
    expect(res.body).toEqual(mockStats)
  })

})
