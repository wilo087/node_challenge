import express from 'express'

const app = express()
app.use(express.json())

const PORT = process.env.PORT ?? 3000

app.get('/', (_req, res) => {
  res.send('Hello from stock service 2')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
