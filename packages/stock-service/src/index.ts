import express from 'express'
import createError from 'http-errors'
import users from './routes/users'

const app = express()
app.use(express.json())

app.use('/users', users)
// TODO: Implement morgan to logger requests

// Catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)))

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
