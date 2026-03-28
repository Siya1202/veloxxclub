import veloxxLogo from '../assets/veloxx_posters.png'

const TABS = [
  { key: 'members', label: 'Members' },
  { key: 'events', label: 'Events' },
]

export default function Navbar({
  activeTab,
  onTabChange,
  onLogout,
  currentAdmin,
  isCollapsed,
  onToggleCollapse,
}) {
  return (
    <aside className={`admin-navbar ${isCollapsed ? 'admin-navbar--collapsed' : ''}`}>
      <div className="admin-navbar__brand">
        <div className="admin-navbar__brand-top">
          <img src={veloxxLogo} alt="VeloxxClub" className="admin-navbar__logo" />
          <button
            type="button"
            className="admin-navbar__toggle"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            aria-pressed={isCollapsed}
          >
            {isCollapsed ? '>' : '<'}
          </button>
        </div>
        <p className={`admin-navbar__user ${isCollapsed ? 'admin-navbar__user--hidden' : ''}`}>
          Signed in as <strong>{currentAdmin?.name ?? currentAdmin?.m_name ?? currentAdmin?.email ?? 'Admin'}</strong>
        </p>
      </div>

      <nav className="admin-navbar__tabs" aria-label="Primary navigation">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`admin-tab ${activeTab === tab.key ? 'admin-tab--active' : ''}`}
            onClick={() => onTabChange(tab.key)}
            aria-label={tab.label}
            title={isCollapsed ? tab.label : undefined}
          >
            <span className={`admin-tab__label ${isCollapsed ? 'admin-tab__label--hidden' : ''}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="admin-logout"
        onClick={onLogout}
        aria-label="Logout"
        title={isCollapsed ? 'Logout' : undefined}
      >
        <span className={isCollapsed ? 'admin-tab__label--hidden' : ''}>Logout</span>
      </button>
    </aside>
  )
}
