import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Search, SlidersHorizontal } from "lucide-react"
import { formatPokemonName, getTypeLabel, PokemonCard } from "@/components/pokemon-card"
import { OFFICIAL_ARTWORK_URL, POKE_API_URL, POKEMON_PAGE_SIZE } from "@/lib/pokemon-config"

const POKEMON_LIST_URL = `${POKE_API_URL}/pokemon`
const ALL_POKEMON_LIMIT = 10000
const pokemonTypes = [
  "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost",
  "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water",
]

async function fetchPokemonList() {
  const response = await fetch(`${POKEMON_LIST_URL}?limit=${ALL_POKEMON_LIMIT}`)
  if (!response.ok) throw new Error(`PokéAPI returned ${response.status}`)
  const list = await response.json()
  return list.results
}

async function fetchPokemonNamesByType(type) {
  const response = await fetch(`${POKE_API_URL}/type/${type}`)
  if (!response.ok) throw new Error(`PokéAPI returned ${response.status}`)
  const typeData = await response.json()
  return new Set(typeData.pokemon.map(({ pokemon }) => pokemon.name))
}

async function fetchPokemonDetails(entries) {
  const records = await Promise.all(
    entries.map(async ({ url }) => {
      const response = await fetch(url, { headers: { Accept: "application/json" } })
      return response.ok ? await response.json() : null
    }),
  )

  const pokemon = records.flatMap((record) => {
    if (!record) return []

    return [{
      id: record.id,
      name: record.name,
      types: record.types.map(({ type }) => type.name),
      image:
        record.sprites.other?.["official-artwork"]?.front_default ??
        record.sprites.front_default ??
        `${OFFICIAL_ARTWORK_URL}/${record.id}.png`,
      height: record.height,
      weight: record.weight,
      baseExperience: record.base_experience ?? 0,
    }]
  })

  if (pokemon.length === 0) throw new Error("PokéAPI returned no Pokémon records")
  return pokemon
}

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es")
}

export function PokemonBrowser() {
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [allPokemon, setAllPokemon] = useState([])
  const [typePokemonNames, setTypePokemonNames] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isListLoading, setIsListLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false
    setIsListLoading(true)
    setError(null)

    fetchPokemonList()
      .then((nextList) => { if (!ignore) setAllPokemon(nextList) })
      .catch((nextError) => { if (!ignore) setError(nextError) })
      .finally(() => { if (!ignore) setIsListLoading(false) })

    return () => { ignore = true }
  }, [reloadKey])

  useEffect(() => {
    let ignore = false

    if (selectedType === "all") {
      setTypePokemonNames(null)
      return undefined
    }

    setTypePokemonNames(null)
    setError(null)
    fetchPokemonNamesByType(selectedType)
      .then((names) => { if (!ignore) setTypePokemonNames(names) })
      .catch((nextError) => { if (!ignore) setError(nextError) })

    return () => { ignore = true }
  }, [selectedType, reloadKey])

  const filteredEntries = useMemo(() => {
    const search = normalize(query.trim())
    const digits = search.replace(/[^0-9]/g, "")

    return allPokemon.filter((entry) => {
      const nameMatches = normalize(formatPokemonName(entry.name)).includes(search)
      const numberMatches = digits.length > 0 && entry.url.split("/").at(-2).padStart(3, "0").includes(digits)
      const typeMatches = selectedType === "all" || typePokemonNames?.has(entry.name)
      return (!search || nameMatches || numberMatches) && typeMatches
    })
  }, [allPokemon, query, selectedType, typePokemonNames])

  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / POKEMON_PAGE_SIZE))
  const pageEntries = useMemo(
    () => filteredEntries.slice(page * POKEMON_PAGE_SIZE, (page + 1) * POKEMON_PAGE_SIZE),
    [filteredEntries, page],
  )
  const filtersReady = !isListLoading && (selectedType === "all" || typePokemonNames)
  const hasCurrentPage = data?.page === page
  const currentPokemon = hasCurrentPage ? data.pokemon : []
  const total = filteredEntries.length
  const rangeStart = total ? Math.min(page * POKEMON_PAGE_SIZE + 1, total) : 0
  const rangeEnd = total ? Math.min((page + 1) * POKEMON_PAGE_SIZE, total) : 0

  useEffect(() => { setPage(0) }, [query, selectedType])

  useEffect(() => {
    let ignore = false

    if (!filtersReady) {
      setData(null)
      setIsLoading(true)
      return undefined
    }

    if (pageEntries.length === 0) {
      setData({ pokemon: [], page })
      setIsLoading(false)
      return undefined
    }

    setIsLoading(true)
    setError(null)
    fetchPokemonDetails(pageEntries)
      .then((pokemon) => { if (!ignore) setData({ pokemon, page }) })
      .catch((nextError) => { if (!ignore) setError(nextError) })
      .finally(() => { if (!ignore) setIsLoading(false) })

    return () => { ignore = true }
  }, [filtersReady, pageEntries, page, reloadKey])

  function resetFilters() {
    setQuery("")
    setSelectedType("all")
  }

  return (
    <div className="pokemon-browser" aria-busy={!hasCurrentPage && !error}>
      <div className="pokemon-browser__toolbar">
        <label className="pokemon-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Buscar por nombre o número</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en toda la Pokédex: Pikachu o 025" />
        </label>
        <label className="pokemon-filter">
          <SlidersHorizontal aria-hidden="true" />
          <span className="sr-only">Filtrar por tipo</span>
          <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
            <option value="all">Todos los tipos</option>
            {pokemonTypes.map((type) => <option key={type} value={type}>{getTypeLabel(type)}</option>)}
          </select>
        </label>
      </div>

      <div className="pokemon-browser__summary" aria-live="polite" role="status">
        <span>{hasCurrentPage ? `${total} ${total === 1 ? "resultado" : "resultados"}` : "Consultando PokéAPI…"}</span>
        {(query || selectedType !== "all") && <button className="pokemon-browser__reset" type="button" onClick={resetFilters}>Limpiar filtros</button>}
      </div>

      {error && !hasCurrentPage ? (
        <div className="pokemon-browser__error" role="alert">
          <p>No pudimos consultar PokéAPI. Revisa tu conexión e inténtalo de nuevo.</p>
          <button className="button button--outline" type="button" onClick={() => setReloadKey((key) => key + 1)}>Reintentar <RefreshCw aria-hidden="true" /></button>
        </div>
      ) : !hasCurrentPage || isLoading ? (
        <p className="pokemon-browser__loading" role="status">Estableciendo conexión con la Pokédex…</p>
      ) : currentPokemon.length > 0 ? (
        <div className="pokemon-grid" id="pokemon-grid">{currentPokemon.map((entry) => <PokemonCard key={entry.id} pokemon={entry} />)}</div>
      ) : (
        <div className="pokemon-empty" role="status">
          <p>No encontramos ese Pokémon.</p>
          <button className="button button--outline" type="button" onClick={resetFilters}>Ver todos</button>
        </div>
      )}

      <nav className="pokedex-pagination" aria-label="Paginación de la Pokédex">
        <div className="pokedex-pagination__summary">
          <span>Registros <strong>{rangeStart}–{rangeEnd}</strong> de {total.toLocaleString("es-AR")}</span>
          <span>Página <strong>{page + 1}</strong> de {pageCount}</span>
        </div>
        <div className="pokedex-pagination__controls">
          <button className="pagination-button" type="button" disabled={page === 0} onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}><ArrowLeft aria-hidden="true" /> Anterior</button>
          <button className="pagination-button pagination-button--next" type="button" disabled={!hasCurrentPage || page + 1 >= pageCount} onClick={() => setPage((currentPage) => currentPage + 1)}>Siguiente <ArrowRight aria-hidden="true" /></button>
        </div>
      </nav>
    </div>
  )
}
