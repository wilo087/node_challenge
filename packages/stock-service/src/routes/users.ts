import express from 'express'
const router = express.Router()

router.get('/', (_req, res, _next) => {
  res.send('Return all users')
})

export default router
