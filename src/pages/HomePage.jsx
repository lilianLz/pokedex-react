import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { PokemonBrowser } from "@/components/pokemon-browser"
import {
  formatPokemonName,
  getTypeLabel,
} from "@/components/pokemon-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { OFFICIAL_ARTWORK_URL, POKEMON_PAGE_SIZE } from "@/lib/pokemon-config"

const featuredPokemon = {
  id: 25,
  name: "pikachu",
  types: ["electric"],
  image: `${OFFICIAL_ARTWORK_URL}/25.png`,
  height: 4,
  weight: 60,
  baseExperience: 112,
}

function scrollToPokedex() {
  document.getElementById("pokedex")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function HomePage() {
  const featuredName = formatPokemonName(featuredPokemon.name)

  return (
    <div className="site-page">
      <SiteHeader active="home" />
      <main className="site-main home-main">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero__copy">
            <p className="home-hero__eyebrow">
              <span className="home-hero__eyebrow-mark" aria-hidden="true" />
              Pokédex de campo <span>/</span> Registro Pokémon
            </p>
            <h1 id="home-title">
              Una guía de bolsillo para <em>explorar el mundo Pokémon.</em>
            </h1>
            <p className="home-hero__description">
              Consulta registros, tipos y medidas con datos de PokéAPI. Busca una especie o recorre
              la base de datos desde los controles de la consola.
            </p>
            <div className="home-hero__actions">
              <button className="button button--accent" onClick={scrollToPokedex} type="button">
                Abrir Pokédex <ArrowRight aria-hidden="true" />
              </button>
              <Link className="button button--ghost" to="/coleccion">
                Ver equipo local <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
            <div className="home-hero__metrics" role="group" aria-label="Características de la Pokédex">
              <div>
                <strong>{String(POKEMON_PAGE_SIZE).padStart(2, "0")}</strong>
                <span>registros por pantalla</span>
              </div>
              <div>
                <strong>18</strong>
                <span>tipos Pokémon</span>
              </div>
              <div>
                <strong>API V2</strong>
                <span>datos de PokéAPI</span>
              </div>
            </div>
          </div>

          <aside className="home-hero__visual" aria-label="Vista de la consola Pokédex">
            <div className="hero-featured">
              <div className="hero-featured__top">
                <span>Registro de muestra</span>
                <span>N.º {String(featuredPokemon.id).padStart(3, "0")}</span>
              </div>
              <div className="hero-featured__artwork">
                <span className="hero-featured__sparkle" aria-hidden="true">
                  <Sparkles />
                </span>
                <img
                  src={featuredPokemon.image}
                  alt={`Ilustración oficial de ${featuredName}`}
                  fetchPriority="high"
                />
              </div>
              <div className="hero-featured__bottom">
                <div>
                  <p>Pokémon destacado</p>
                  <h2>{featuredName}</h2>
                </div>
                <div className="hero-featured__types" aria-label={`Tipos de ${featuredName}`}>
                  {featuredPokemon.types.map((type) => (
                    <span className="type-pill" data-type={type} key={type}>
                      {getTypeLabel(type)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pokedex-hardware" aria-hidden="true">
              <div className="pokedex-dpad">
                <span />
              </div>
              <div className="pokedex-control-labels">
                <span>SELECT</span>
                <span>START</span>
              </div>
              <div className="pokedex-action-buttons">
                <span>B</span>
                <span>A</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="pokedex-section" id="pokedex" aria-labelledby="pokedex-title">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">01 / Explorador Pokédex</p>
              <h2 id="pokedex-title">La Pokédex, entrada por entrada.</h2>
            </div>
            <p className="section-heading__description">
              {POKEMON_PAGE_SIZE} Pokémon por página. Recorre el catálogo de PokéAPI y filtra por
              nombre, número o tipo.
            </p>
          </div>
          <PokemonBrowser />
        </section>

        <section className="api-attribution" aria-label="Fuente de datos">
          <div className="api-attribution__badge" aria-hidden="true">API</div>
          <div>
            <p>Datos e imágenes</p>
            <h2>PokéAPI · Pokémon data</h2>
          </div>
          <p className="api-attribution__description">
            La lista consulta PokéAPI en el navegador y presenta estadísticas e ilustraciones de
            sus registros.
          </p>
          <a
            className="api-attribution__link"
            href="https://pokeapi.co/docs/v2"
            target="_blank"
            rel="noreferrer"
            aria-label="Consultar la documentación de PokéAPI"
          >
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
