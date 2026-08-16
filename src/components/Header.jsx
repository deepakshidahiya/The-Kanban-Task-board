function Header() {
  return (
    <header className="app-header">
      <div className="app-header-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="var(--primary)" strokeWidth="2" />
          <path
            d="M8 12.5L11 15.5L16 9.5"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1>Kanban Task Board</h1>
      <p>Organize your work and keep projects moving.</p>
    </header>
  )
}

export default Header
