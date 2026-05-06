import { useEffect, useState } from "react"

function App() {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {

    fetch("http://localhost:3001/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data)
      })

  }, [])

  return (
    <div>

      <h1>Notifications</h1>

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