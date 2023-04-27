import express from 'express'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { auth } from '../../middleware/auth'
import db from '@stock/db'

import { stock } from '../../routes'
import { config } from '../../config'

const fakeToken = jwt.sign({ userId: 1 }, config.secret, { expiresIn: '24h' })

describe('GET /Stock', () => {
  const mockAddHistory = jest.spyOn(db.UserHistory, 'addHistory')
  const app = express()
  app.use('/', auth, stock)

  afterEach(() => {
    mockAddHistory.mockReset()
  })

  afterAll(() => {
    mockAddHistory.mockRestore()
  })

  describe('GET /:code', () => {
    it('Stock should return data and add it to user history', async () => {
      const code = 'AAPL.US'
      const data = {
        name: 'APPLE',
        symbol: code,
        open: 123.66,
        high: 123.66,
        low: 122.49,
        close: 123
      }

      const responseFromStockApi = { json: jest.fn().mockResolvedValue(data), status: 200 }
      const addHistoryMock = jest.spyOn(db.UserHistory, 'addHistory').mockResolvedValue(void 0)
      const fetchMock = jest.fn().mockResolvedValue(responseFromStockApi)
      global.fetch = fetchMock

      const user = { id: 1 }

      const response = await request(app).get(`/${code}`).set('Authorization', `Bearer ${fakeToken}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(data)
      expect(fetchMock).toHaveBeenCalledWith(`${config.stockApiUrl}/stock/${code}`)
      expect(addHistoryMock).toHaveBeenCalledWith(user.id, data)
    })

    it('should return 404 if stock is not found', async () => {
      const code = 'INVALID'

      const responseFromStockApi = { status: 404 }
      const fetchMock = jest.fn().mockResolvedValue(responseFromStockApi)
      global.fetch = fetchMock

      const response = await request(app).get(`/${code}`).set('Authorization', `Bearer ${fakeToken}`)

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('Stock not found, here is the available stock list https://stooq.com/t/?i=518')
      expect(fetchMock).toHaveBeenCalledWith(`${config.stockApiUrl}/stock/${code}`)
      expect(db.UserHistory.addHistory).not.toHaveBeenCalled()
    })

    it('should return 500 if an error occurs', async () => {
      const code = 'AAPL.US'

      const fetchMock = jest.fn().mockRejectedValue(new Error('Failed to fetch stock data'))
      global.fetch = fetchMock

      const response = await request(app).get(`/${code}`).set('Authorization', `Bearer ${fakeToken}`)

      expect(response.status).toBe(500)
      expect(response.body.message).toBe('Internal server error')
      expect(fetchMock).toHaveBeenCalledWith(`${config.stockApiUrl}/stock/${code}`)
      expect(db.UserHistory.addHistory).not.toHaveBeenCalled()
    })
  })
})