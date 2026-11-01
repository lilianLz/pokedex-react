import { ArrowUpRight, Compass } from "lucide-react"
import { PokemonCard } from "@/components/pokemon-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { localTeam } from "../data/collection-data"

function scrollToTeam() {
  document.getElementById("equipo")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function CollectionPage() {
  return (
    <div className="site-page">
      <SiteHeader active="collection" />
      <main className="site-main subpage-main">
        <section className="subpage-intro" aria-labelledby="team-title">
          <div className="subpage-intro__copy">
            <p className="section-eyebrow">02 / Equipo local</p>
            <h1 id="team-title">
              Un equipo listo <em>para salir.</em>
            </h1>
            <p>
              Seis compañeros elegidos para una aventura clásica. Estos registros viven en un
              array local del proyecto, con imagen, tipo y estadísticas básicas.
            </p>
            <button className="button button--outline" onClick={scrollToTeam} type="button">
              Ver los integrantes <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
          <div className="subpage-intro__card" aria-hidden="true">
            <Compass />
            <span>Bitácora de entrenador</span>
            <strong>{String(localTeam.length).padStart(2, "0")}</strong>
            <small>Pokémon en el equipo</small>
          </div>
        </section>

        <section className="local-team-section" id="equipo" aria-labelledby="local-team-heading">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">Selección guardada</p>
              <h2 id="local-team-heading">Tu equipo de expedición.</h2>
            </div>
            <p className="section-heading__description">
              Datos e imágenes definidos de forma local para mostrar una colección independiente
              de la portada.
            </p>
          </div>

          <div className="pokemon-grid pokemon-grid--local">
            {localTeam.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </section>

        <aside className="local-source-note">
          <span className="local-source-note__mark" aria-hidden="true">LOCAL</span>
          <p>
            Esta página muestra el array local <code>localTeam</code>, almacenado en
            <code> src/data/collection-data.js</code>. Cada objeto incluye un campo de imagen.
          </p>
        </aside>
      </main>
      <SiteFooter />
    </div>
  )
}
