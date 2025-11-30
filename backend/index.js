const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Serve a simple health check
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Serve emergencies list from data file
app.get('/api/emergencies', (req, res) => {
  const file = path.join(__dirname, 'data', 'emergencies.json')
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'failed to read data' })
    try {
      const json = JSON.parse(data)
      res.json(json)
    } catch (e) {
      res.status(500).json({ error: 'invalid json' })
    }
  })
})

// Single emergency by id or slug
app.get('/api/emergencies/:id', (req, res) => {
  const id = req.params.id
  const file = path.join(__dirname, 'data', 'emergencies.json')
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'failed to read data' })
    try {
      const json = JSON.parse(data)
      const found = json.find(e => e.id === id || e.slug === id)
      if (!found) return res.status(404).json({ error: 'not found' })
      res.json(found)
    } catch (e) {
      res.status(500).json({ error: 'invalid json' })
    }
  })
})

app.listen(port, () => {
  console.log(`first-aid-backend listening on http://localhost:${port}`)
})
