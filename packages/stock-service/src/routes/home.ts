import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', (_req, res, _next) => {
  res.send('Welcome to the stock service')
  // res.render('index', { title: 'Express' })
})

export default router
