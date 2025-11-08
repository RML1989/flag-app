import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getAllCountries, getByRegion } from '../api.js'
import CountryCard from '../components/CountryCard.jsx'
import Search from '../components/Search.jsx'
import RegionFilter from '../components/RegionFilter.jsx'

export async function loader({ request }) {
  // support region query (?region=Europe) when user navigates back
  const url = new URL(request.url)
  const region = url.searchParams.get('region')
  const data = region ? await getByRegion(region) : await getAllCountries()
  return { data, region }
}

export default function HomePage() {
  const { data: initialData, region: initialRegion } = useLoaderData()
  const [query, setQuery] = React.useState('')
  const [region, setRegion] = React.useState(initialRegion)
  const [data, setData] = React.useState(initialData)

  // refetch when region changes
  React.useEffect(() => {
    let ignore = false
    async function run() {
      const res = region ? await getByRegion(region) : await getAllCountries()
      if (!ignore) setData(res)
      // keep URL in sync
      const sp = new URLSearchParams(window.location.search)
      if (region) sp.set('region', region); else sp.delete('region')
      const newUrl = `${window.location.pathname}?${sp.toString()}`
      window.history.replaceState(null, '', newUrl.endsWith('?') ? newUrl.slice(0, -1) : newUrl)
    }
    run()
    return () => { ignore = true }
  }, [region])

  const filtered = React.useMemo(() => {
    if (!query) return data
    const q = query.toLowerCase()
    return data.filter(c => c.name?.common?.toLowerCase().includes(q))
  }, [query, data])

  return (
    <section className="section">
      <div className="hero">
        <Search value={query} onChange={setQuery} />
        <RegionFilter value={region ?? ''} onChange={setRegion} />
      </div>
      <div className="grid">
        {filtered.map(c => <CountryCard key={c.cca3} c={c} />)}
      </div>
    </section>
  )
}
