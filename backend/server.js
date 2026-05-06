const express = require("express")
const cors = require("cors")
const logger = require("./logger")

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

let notifications = [
  {
    id: 1,
    title: "Placement Drive",
    type: "Placement"
  },
  {
    id: 2,
    title: "Semester Results",
    type: "Result"
  }
]

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
  const newNotification = {
    id: notifications.length + 1,
    title: req.body.title,
    type: req.body.type
  }
  notifications.push(newNotification)
  res.status(201).json({
    message: "Notification added"
  })

})
app.post("/notifications", (req, res) => {
  const { title, type } = req.body
  notifications.push({
    id: notifications.length + 1,
    title,
    type
  })
   res.status(201).json({ message: "Notification added" })
})

app.delete("/notifications/:id", (req, res) => {

  const id = Number(req.params.id)

  notifications = notifications.filter(n => n.id !== id)

  res.json({
    message: "Notification deleted"
  })

})