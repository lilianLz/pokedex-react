import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

const navigation = [
  { label: "Pokédex", href: "/", section: "home" },
  { label: "Equipo local", href: "/coleccion", section: "collection" },
  { label: "Contacto", href: "/contacto", section: "contact" },
]

export function SiteHeader({ active }) {
  return (
    <header className="site-header">
      <Link className="site-brand" to="/" aria-label="Pokédex, inicio">
        <span className="site-brand__mark" aria-hidden="true">
          P
        </span>
        <span className="site-brand__copy">
          <span className="site-brand__name">Pokédex</span>
          <span className="site-brand__descriptor">guía de campo</span>
        </span>
      </Link>

      <nav className="site-navigation" aria-label="Navegación principal">
        {navigation.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            aria-current={active === item.section ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="site-header-cta" to="/coleccion">
        Arma tu equipo
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </header>
  )
}
