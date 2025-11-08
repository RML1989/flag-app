import React from 'react'
import ThemeToggle from './ThemeToggle.jsx'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="nav">
      <Link to="/" className="brand">The Flag App</Link>
      <div className="controls">
        <ThemeToggle />
      </div>
    </header>
  )
}
