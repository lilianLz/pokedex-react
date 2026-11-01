const officialArtwork = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const localTeam = [
  {
    id: 1,
    name: "bulbasaur",
    types: ["grass", "poison"],
    image: officialArtwork(1),
    height: 7,
    weight: 69,
    baseExperience: 64,
  },
  {
    id: 4,
    name: "charmander",
    types: ["fire"],
    image: officialArtwork(4),
    height: 6,
    weight: 85,
    baseExperience: 62,
  },
  {
    id: 7,
    name: "squirtle",
    types: ["water"],
    image: officialArtwork(7),
    height: 5,
    weight: 90,
    baseExperience: 63,
  },
  {
    id: 25,
    name: "pikachu",
    types: ["electric"],
    image: officialArtwork(25),
    height: 4,
    weight: 60,
    baseExperience: 112,
  },
  {
    id: 133,
    name: "eevee",
    types: ["normal"],
    image: officialArtwork(133),
    height: 3,
    weight: 65,
    baseExperience: 65,
  },
  {
    id: 143,
    name: "snorlax",
    types: ["normal"],
    image: officialArtwork(143),
    height: 21,
    weight: 4600,
    baseExperience: 189,
  },
]
