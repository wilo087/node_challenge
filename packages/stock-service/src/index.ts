import express, { Request, Response, NextFunction } from 'express'
import createError, { HttpError } from 'http-errors'
import { home, register, stock, history, stats, auth } from './routes'
const app = express()
app.use(express.json())

app.use('/', home)
app.use('/register', register)
app.use('/auth', auth)
app.use('/stock', stock)
app.use('/history', history)
app.use('/stats', stats)

// TODO: Implement morgan to logger requests
// Catch 404 and forward to error handler
app.use((_req, _res, next) => next(createError(404)))
app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status ?? 500).send(err.message)
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
