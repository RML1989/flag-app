import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { getByNameFull, getByCodes } from '../api.js'

export async function loader({ params }) {
  const country = await getByNameFull(params.name)
  let neighbors = []
  if (country?.borders?.length) {
    neighbors = await getByCodes(country.borders)
  }
  return { country, neighbors }
}

export default function CountryPage() {
  const { country, neighbors } = useLoaderData()
  const flag = country.flags?.svg || country.flags?.png
  const cap = Array.isArray(country.capital) ? country.capital.join(', ') : country.capital
  const langs = country.languages ? Object.values(country.languages).join(', ') : '—'
  const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : '—'

  return (
    <section className="section">
      <Link className="btn" to="..">← Tillbaka</Link>
      <div className="hr" />
      <div className="row">
        <img src={flag} alt={country.flags?.alt || `Flag of ${country.name?.common}`} style={{ maxWidth: 420, borderRadius: 12 }} />
        <div style={{ minWidth: 280 }}>
          <h1>{country.name?.common}</h1>
          <p className="small">Officiellt namn: {country.name?.official}</p>
          <p className="small">Huvudstad: {cap}</p>
          <p className="small">Region: {country.region} • Subregion: {country.subregion || '—'}</p>
          <p className="small">Befolkning: {country.population?.toLocaleString?.()}</p>
          <p className="small">Språk: {langs}</p>
          <p className="small">Valuta: {currencies}</p>
          {neighbors?.length ? (
            <div style={{ marginTop: 12 }}>
              <div className="small" style={{ marginBottom: 8 }}>Grannländer:</div>
              <div className="row">
                {neighbors.map(n => (
                  <Link key={n.cca3} to={`/${encodeURIComponent(n.name?.common)}`} className="badge">
                    {n.name?.common}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
