import { useState } from 'react'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'

function App() {
  const [currentAdmin, setCurrentAdmin] = useState(null)

  return currentAdmin
    ? <Dashboard currentAdmin={currentAdmin} onLogout={() => setCurrentAdmin(null)} />
    : <Login onLogin={setCurrentAdmin} />
}

export default App
