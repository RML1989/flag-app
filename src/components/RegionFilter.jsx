import React from 'react'

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function RegionFilter({ value, onChange }) {
  return (
    <select className="select" value={value ?? ''} onChange={(e) => onChange(e.target.value || null)} aria-label="Filter by region">
      <option value="">Alla regioner</option>
      {regions.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  )
}
