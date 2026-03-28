import { useState } from 'react'
import Login from './Login.jsx'
import Navbar from './components/Navbar.jsx'
import Members from './Members.jsx'
import Events from './Events.jsx'
import './Dashboard.css'

const pageComponents = {
  members: Members,
  events: Events,
}

function App() {
  const [currentAdmin, setCurrentAdmin] = useState(null)
  const [activeTab, setActiveTab] = useState('members')
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false)

  if (!currentAdmin) {
    return <Login onLogin={setCurrentAdmin} />
  }

  const ActivePage = pageComponents[activeTab] ?? Members

  return (
    <div className={`admin-shell ${isNavbarCollapsed ? 'admin-shell--collapsed' : ''}`}>
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={() => setCurrentAdmin(null)}
        currentAdmin={currentAdmin}
        isCollapsed={isNavbarCollapsed}
        onToggleCollapse={() => setIsNavbarCollapsed((currentValue) => !currentValue)}
      />

      <main className="admin-content">
        <ActivePage />
      </main>
    </div>
  )
}

export default App
