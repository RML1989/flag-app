import React from 'react'

export default function Search({ value, onChange }) {
  return (
    <input
      className="input"
      placeholder="Sök efter land..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sök"
    />
  )
}
