const express = require("express")
const cors = require("cors")
const logger = require("./logger")
const db = require("./db")
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.get("/notifications", (req, res) => {
  db.query("SELECT * FROM notifications", (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})


app.get("/", (req, res) => {
  res.json({
    message: "Backend working"
  })
})

app.get("/notifications", (req, res) => {
  res.status(200).json(notifications)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
app.post("/notifications", (req, res) => {
  const { title, type } = req.body

  db.query("INSERT INTO notifications (title, type) VALUES (?, ?)", [title, type], (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    res.status(201).json({ message: "Added" })
  })
})


app.delete("/notifications/:id", (req, res) => {
  const id = req.params.id

  db.query("DELETE FROM notifications WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err)
    res.json({ message: "Deleted" })
  })
})