import { useState } from 'react'
import Login from './Login.jsx'
import PostLoginLanding from './PostLoginLanding.jsx'
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
  const [hasSelectedDashboardPage, setHasSelectedDashboardPage] = useState(false)

  if (!currentAdmin) {
    return (
      <Login
        onLogin={(admin) => {
          setCurrentAdmin(admin)
          setHasSelectedDashboardPage(false)
          setActiveTab('members')
        }}
      />
    )
  }

  if (!hasSelectedDashboardPage) {
    return (
      <PostLoginLanding
        onSelectPage={(nextTab) => {
          setActiveTab(nextTab)
          setHasSelectedDashboardPage(true)
        }}
      />
    )
  }

  const ActivePage = pageComponents[activeTab] ?? Members

  return (
    <div className={`admin-shell ${isNavbarCollapsed ? 'admin-shell--collapsed' : ''}`}>
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={() => {
          setCurrentAdmin(null)
          setHasSelectedDashboardPage(false)
          setActiveTab('members')
        }}
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
