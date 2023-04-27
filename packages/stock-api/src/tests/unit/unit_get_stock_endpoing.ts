/* eslint-disable */
import request from 'supertest'
import express from 'express'
import { Stock as StockType } from '../../types'
import { getStock } from '../../services'
import { stock } from '../../routes'

jest.mock('../services', () => ({
  getStock: jest.fn()
}))

describe('stock router', () => {
  const app = express()
  app.use('/stock', stock)

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should return the stock for a valid code', async () => {
    const code = 'AAPL.US'

    const expectedStock = [{
        name: 'APPLE',
        symbol: 'AAPL.US',
        open: 123.66,
        high: 123.66,
        low: 122.49,
        close: 123
      }] as StockType[]
    
    (getStock as jest.Mock).mockResolvedValue(expectedStock)

    const response = await request(app).get(`/stock/${code}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expectedStock)
    expect(getStock).toHaveBeenCalledWith(code)
  })

  test('should return 404 for an invalid code', async () => {
    const code = 'INVALID' as string

    (getStock as jest.Mock).mockResolvedValue(null)

    const response = await request(app).get(`/stock/${code}`)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Stock not found' })
    expect(getStock).toHaveBeenCalledWith(code)
  })

  test('should return 500 for a server error', async () => {
    const code = 'AAPL.US'
    const errorMessage = 'Internal server error' as string

    (getStock as jest.Mock).mockRejectedValue(new Error(errorMessage))

    const response = await request(app).get(`/stock/${code}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: errorMessage })
    expect(getStock).toHaveBeenCalledWith(code)
  })
})
