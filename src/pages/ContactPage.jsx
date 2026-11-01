import { ArrowUpRight, MapPin, Send } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function ContactPage() {
  return (
    <div className="site-page">
      <SiteHeader active="contact" />
      <main className="site-main subpage-main contact-main">
        <section className="subpage-intro contact-intro" aria-labelledby="contact-title">
          <div className="subpage-intro__copy">
            <p className="section-eyebrow">03 / Contacto</p>
            <h1 id="contact-title">
              ¿Listo para la siguiente <em>aventura?</em>
            </h1>
            <p>
              ¿Tienes una pregunta, una idea para la comunidad o quieres compartir tu equipo?
              Déjanos un mensaje y nos pondremos en contacto.
            </p>
          </div>
          <div className="contact-location-card">
            <span className="contact-location-card__icon" aria-hidden="true">
              <MapPin />
            </span>
            <div>
              <span className="contact-location-card__label">Punto de encuentro de referencia</span>
              <strong>Córdoba, Argentina</strong>
              <p>Plaza San Martín · Centro</p>
            </div>
          </div>
        </section>

        <section className="contact-grid" aria-label="Formulario de contacto y mapa">
          <div className="contact-form-card">
            <div className="contact-card-heading">
              <span className="contact-card-heading__icon" aria-hidden="true">
                <Send />
              </span>
              <div>
                <p className="section-eyebrow">Escríbenos</p>
                <h2>Tu mensaje comienza aquí.</h2>
              </div>
            </div>
            <p className="contact-card-description">
              Completa los campos y enviaremos el mensaje mediante EmailJS. El destinatario se configura en tu plantilla.
            </p>
            <ContactForm />
          </div>

          <div className="contact-map-card">
            <div className="contact-map-card__heading">
              <div>
                <p className="section-eyebrow">Centro · Córdoba</p>
                <h2>Encuentra el punto en el mapa.</h2>
              </div>
              <span className="contact-map-card__number" aria-hidden="true">01</span>
            </div>

            <iframe
              className="contact-map"
              title="Mapa del centro de Córdoba, Argentina"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-64.1880%2C-31.4200%2C-64.1780%2C-31.4130&layer=mapnik&marker=-31.4167%2C-64.1833"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />

            <div className="contact-map-card__footer">
              <div className="contact-map-card__address">
                <MapPin aria-hidden="true" />
                <p>
                  Plaza San Martín, Centro
                  <br />
                  Córdoba, Argentina
                </p>
              </div>
              <a
                className="contact-map-card__link"
                href="https://www.openstreetmap.org/?mlat=-31.4167&mlon=-64.1833#map=16/-31.4167/-64.1833"
                target="_blank"
                rel="noreferrer noopener"
              >
                Abrir mapa <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <p className="contact-map-card__note">
              Ubicación de referencia para esta Pokédex académica.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
