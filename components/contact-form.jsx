import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { ArrowUpRight } from "lucide-react"
import { EMAILJS_CONFIG } from "@/lib/emailjs-config"

const isEmailJSConfigured = Object.values(EMAILJS_CONFIG).every(
  (value) => value.length > 0 && !value.startsWith("YOUR_"),
)

export function ContactForm() {
  const formRef = useRef(null)
  const [status, setStatus] = useState({ state: "idle", message: "" })
  const isSending = status.state === "sending"

  async function handleSubmit(event) {
    event.preventDefault()

    const form = formRef.current
    if (!form) return

    if (!isEmailJSConfigured) {
      setStatus({
        state: "error",
        message:
          "Falta configurar serviceId, templateId y publicKey en lib/emailjs-config.js. El mensaje todavía no se envió.",
      })
      return
    }

    setStatus({ state: "sending", message: "Enviando mensaje…" })

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        form,
        { publicKey: EMAILJS_CONFIG.publicKey },
      )
      form.reset()
      setStatus({ state: "success", message: "Mensaje enviado. Gracias por escribirnos." })
    } catch {
      setStatus({
        state: "error",
        message: "No se pudo enviar el mensaje. Revisa la configuración de EmailJS e inténtalo otra vez.",
      })
    }
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={handleSubmit}
      aria-label="Enviar un mensaje"
    >
      <input type="hidden" name="to_name" value="Equipo Pokédex" />
      <div className="contact-form__row">
        <div className="contact-field">
          <label htmlFor="contact-name">Nombre</label>
          <input
            autoComplete="name"
            id="contact-name"
            name="from_name"
            placeholder="Tu nombre"
            maxLength={80}
            required
          />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Correo electrónico</label>
          <input
            autoComplete="email"
            id="contact-email"
            name="reply_to"
            placeholder="tu@correo.com"
            maxLength={254}
            required
            type="email"
          />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-topic">Asunto</label>
        <input
          id="contact-topic"
          name="subject"
          placeholder="Visitas, obras, colaboraciones…"
          maxLength={120}
          required
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          name="message"
          minLength={10}
          maxLength={5000}
          placeholder="Cuéntanos un poco más…"
          required
          rows={5}
        />
      </div>

      <p className="contact-form__notice">
        {isEmailJSConfigured ? (
          "El destinatario y las variables del mensaje se definen en tu plantilla de EmailJS."
        ) : (
          <>
            Para activar el envío, reemplaza los tres valores de ejemplo en{" "}
            <code>lib/emailjs-config.js</code>. En la plantilla, usa from_name, reply_to, subject y
            message.
          </>
        )}
      </p>

      <button className="button button--accent contact-form__submit" type="submit" disabled={isSending}>
        {isSending ? "Enviando…" : "Enviar mensaje"}
        <ArrowUpRight aria-hidden="true" />
      </button>
      <p
        className="contact-form__status"
        data-state={status.state}
        aria-live="polite"
        role="status"
      >
        {status.message}
      </p>
    </form>
  )
}
