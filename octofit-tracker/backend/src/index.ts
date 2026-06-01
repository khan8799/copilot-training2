import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit'

app.use(express.json())

app.get('/api/health', (_, res) => {
  res.json({
    status: 'ok',
    service: 'OctoFit Tracker Backend',
    port,
    mongoUri
  })
})

mongoose
  .connect(mongoUri, {
    autoIndex: true
  })
  .then(() => {
    console.log('Connected to MongoDB on port 27017')
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
