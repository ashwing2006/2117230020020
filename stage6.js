const fetch = require("node-fetch")

const TOKEN = "YOUR_TOKEN"

const priority = {
  Placement: 3,
  Result: 2,
  Event: 1
}

async function getNotifications() {
  const res = await fetch("http://20.207.122.201/evaluation-service/notifications", {
    headers: { Authorization: `Bearer ${TOKEN}` }
  })

  const data = await res.json()

  const sorted = data.notifications.sort((a, b) => {
    if (priority[b.Type] !== priority[a.Type]) return priority[b.Type] - priority[a.Type]
    return new Date(b.Timestamp) - new Date(a.Timestamp)
  })

  console.log(sorted.slice(0, 10))
}

getNotifications()