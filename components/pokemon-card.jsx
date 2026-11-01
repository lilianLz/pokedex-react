const typeLabels = {
  bug: "Bicho",
  dark: "Siniestro",
  dragon: "Dragón",
  electric: "Eléctrico",
  fairy: "Hada",
  fighting: "Lucha",
  fire: "Fuego",
  flying: "Volador",
  ghost: "Fantasma",
  grass: "Planta",
  ground: "Tierra",
  ice: "Hielo",
  normal: "Normal",
  poison: "Veneno",
  psychic: "Psíquico",
  rock: "Roca",
  steel: "Acero",
  water: "Agua",
}

export function formatPokemonName(name) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toLocaleUpperCase("es") + part.slice(1))
    .join(" ")
}

export function getTypeLabel(type) {
  return typeLabels[type] ?? type
}

export function PokemonCard({ pokemon }) {
  const name = formatPokemonName(pokemon.name)
  const height = (pokemon.height / 10).toFixed(1)
  const weight = (pokemon.weight / 10).toFixed(1)

  return (
    <article className="pokemon-card" data-primary-type={pokemon.types[0] ?? "normal"}>
      <div className="pokemon-card__artwork">
        <span className="pokemon-card__number">
          N.º {String(pokemon.id).padStart(3, "0")}
        </span>
        <img
          src={pokemon.image}
          alt={`Ilustración oficial de ${name}`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="pokemon-card__body">
        <div className="pokemon-card__title-row">
          <div>
            <p className="pokemon-card__eyebrow">Pokémon</p>
            <h3>{name}</h3>
          </div>
          <span className="pokemon-card__id" aria-hidden="true">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
        </div>

        <div className="pokemon-card__types" aria-label={`Tipos de ${name}`}>
          {pokemon.types.map((type) => (
            <span className="type-pill" data-type={type} key={type}>
              {getTypeLabel(type)}
            </span>
          ))}
        </div>

        <dl className="pokemon-card__stats">
          <div>
            <dt>Altura</dt>
            <dd>{height} m</dd>
          </div>
          <div>
            <dt>Peso</dt>
            <dd>{weight} kg</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
