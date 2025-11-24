import React, { useEffect, useState } from 'react'

export default function App() {
  const [msg, setMsg] = useState('loading...')
  useEffect(() => {
    fetch('/api/message').then(r => r.json()).then(j => {
      setMsg(JSON.stringify(j))
    }).catch(e => {
      setMsg('backend not reachable')
    })
  }, [])
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>TaskMaster Demo</h1>
      <p>This is the frontend. It calls <code>/api/message</code> on the backend.</p>
      <pre>{msg}</pre>
    </div>
  )
}
