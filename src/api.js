const BASE = 'https://restcountries.com/v3.1'

export async function getAllCountries() {
  const res = await fetch(`${BASE}/all?fields=name,capital,region,population,flags,cca3`)
  if (!res.ok) throw new Response('Nätverksfel', { status: res.status })
  return res.json()
}

export async function getByRegion(region) {
  const res = await fetch(`${BASE}/region/${encodeURIComponent(region)}?fields=name,capital,region,population,flags,cca3`)
  if (!res.ok) throw new Response('Nätverksfel', { status: res.status })
  return res.json()
}

export async function getByNameFull(name) {
  const res = await fetch(`${BASE}/name/${encodeURIComponent(name)}?fullText=true`)
  if (!res.ok) throw new Response('Land hittades inte', { status: res.status })
  const data = await res.json()
  return data[0]
}

export async function getByCodes(codes = []) {
  if (!codes?.length) return []
  const res = await fetch(`${BASE}/alpha?codes=${codes.join(',')}&fields=name,cca3`)
  if (!res.ok) return []
  return res.json()
}
