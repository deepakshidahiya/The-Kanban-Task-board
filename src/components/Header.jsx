function Header() {
  return (
    <header className="app-header">
      <div className="app-header-mark" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="4" height="14" rx="1.5" fill="#ffffff" />
          <rect x="10" y="5" width="4" height="9" rx="1.5" fill="#ffffff" opacity="0.85" />
          <rect x="17" y="5" width="4" height="6" rx="1.5" fill="#ffffff" opacity="0.7" />
        </svg>
      </div>
      <h1>Kanban Task Board</h1>
      <p>Organize your work and keep projects moving.</p>
    </header>
  )
}

export default Header
