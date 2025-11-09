import React from 'react'
import { Link } from 'react-router-dom'

export default function CountryCard({ c }) {
  return (
    <Link to={`/${encodeURIComponent(c?.name?.common)}`} className="card">
      <img className="flag" src={c.flags?.svg || c.flags?.png} alt={c.flags?.alt || `Flag of ${c.name?.common}`} />
      <div className="card-body">
        <h2>{c.name?.common}</h2>
        <p className="meta">Population: {c.population?.toLocaleString?.()}</p>
        <p className="meta">Region: {c.region}</p>
        <p className="meta">Capital: {Array.isArray(c.capital) ? c.capital.join(', ') : c.capital}</p>
      </div>
    </Link>
  )
}
