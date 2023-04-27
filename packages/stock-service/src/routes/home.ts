import express from 'express'

const router = express.Router()

router.get('/', (_req, res, _next) => {
  res.json('Welcome to the stock service')
})

export default router
