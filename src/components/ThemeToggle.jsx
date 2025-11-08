import React from 'react'

export default function ThemeToggle() {
  const [mode, setMode] = React.useState(() => document.documentElement.getAttribute('data-theme') || 'light')

  function toggle() {
    const next = mode === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    setMode(next)
    // Persist in localStorage
    try { localStorage.setItem('theme', next) } catch {}
  }

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) { document.documentElement.setAttribute('data-theme', saved); setMode(saved) }
    } catch {}
  }, [])

  return (
    <button className="btn" onClick={toggle} aria-label="Toggle theme">
      {mode === 'light' ? '☾ Dark Mode' : '☀ Light Mode'}
    </button>
  )
}
