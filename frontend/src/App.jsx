import { useEffect, useState } from "react"

function App() {

  const [notifications, setNotifications] = useState([])

  const [title, setTitle] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    fetchNotifications()
  }, [])

  function fetchNotifications() {

    fetch("http://localhost:3001/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data)
      })

  }

  function addNotification() {

    fetch("http://localhost:3001/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        type
      })
    })
      .then((res) => res.json())
      .then(() => {

        fetchNotifications()

        setTitle("")
        setType("")
      })

  }

  return (
    <div>

      <h1>Notifications</h1>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <br /><br />

      <button onClick={addNotification}>
        Add
      </button>

      <hr />

      {
        notifications.map((item) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.type}</p>
            <hr />
          </div>
        ))
      }

    </div>
  )
}

export default App