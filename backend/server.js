import express from 'express'
import cors from 'cors'
import artworks from './api/artworks.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/lm66/artworks", artworks)

app.use('*', (req,res) => {
  res.status(404).json({error: "not found"})
})

export default app
