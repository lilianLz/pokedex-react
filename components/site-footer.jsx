import { Link } from "react-router-dom"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link className="site-footer__name" to="/">
            Pokédex<span aria-hidden="true">.</span>
          </Link>
          <p>Tu guía de campo para explorar y formar equipo.</p>
        </div>

        <div className="site-footer__links">
          <span className="site-footer__label">Explora</span>
          <Link to="/">Pokédex pública</Link>
          <Link to="/coleccion">Equipo local</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="site-footer__note">
          <span className="site-footer__label">Datos abiertos</span>
          <p>Contenido consultado desde PokéAPI. Proyecto académico no oficial.</p>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Pokédex</span>
        <span>Explora, aprende y cuida a tu equipo</span>
      </div>
    </footer>
  )
}
