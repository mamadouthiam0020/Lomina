import { useState } from 'react'
import { Mail, MapPin, Phone, User } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { contact } from '../data/contact'
import PageHero from '../components/PageHero'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t } = useLanguage()
  const page = t.pages.contact
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = page.required
    if (!values.email.trim()) next.email = page.required
    else if (!EMAIL_RE.test(values.email.trim())) next.email = page.invalidEmail
    if (!values.subject.trim()) next.subject = page.required
    if (!values.message.trim()) next.message = page.required
    return next
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
      setValues({ name: '', email: '', subject: '', message: '' })
    }
  }

  const fieldClass = (field) =>
    `w-full border bg-paper px-4 py-3 text-sm text-ink transition-colors placeholder:text-steel/60 focus:outline-none ${
      errors[field] ? 'border-red-500/70' : 'border-ink/15 focus:border-ink'
    }`

  return (
    <>
      <PageHero title={page.title} lead={page.lead} />
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <aside
              aria-labelledby="contact-details-title"
              className="flex flex-col gap-8"
            >
              <h2
                id="contact-details-title"
                className="font-display text-[11px] tracking-[0.28em] text-ink uppercase"
              >
                {page.detailsTitle}
              </h2>
              <dl className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <User
                    className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[10px] tracking-[0.2em] text-steel uppercase">
                      {page.ceoLabel}
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{contact.ceoName}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[10px] tracking-[0.2em] text-steel uppercase">
                      {page.phoneLabel}
                    </dt>
                    <dd className="mt-1 text-sm">
                      <a
                        href={`tel:${contact.phoneHref}`}
                        className="text-ink transition-colors hover:text-champagne"
                      >
                        {contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[10px] tracking-[0.2em] text-steel uppercase">
                      {page.emailLabel}
                    </dt>
                    <dd className="mt-1 text-sm">
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-ink transition-colors hover:text-champagne"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[10px] tracking-[0.2em] text-steel uppercase">
                      {page.addressLabel}
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{contact.address}</dd>
                  </div>
                </div>
              </dl>
            </aside>

            <div>
          {submitted && (
            <p
              role="status"
              className="mb-8 border border-champagne/50 bg-champagne/10 px-4 py-3 text-sm text-ink"
            >
              {page.success}
            </p>
          )}

          <form onSubmit={onSubmit} noValidate className="space-y-6">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-[10.5px] tracking-[0.2em] text-ink uppercase"
              >
                {page.name}
              </label>
              <input
                id="contact-name"
                type="text"
                value={values.name}
                onChange={update('name')}
                placeholder={page.namePlaceholder}
                aria-invalid={Boolean(errors.name)}
                className={fieldClass('name')}
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-[10.5px] tracking-[0.2em] text-ink uppercase"
              >
                {page.email}
              </label>
              <input
                id="contact-email"
                type="email"
                value={values.email}
                onChange={update('email')}
                placeholder={page.emailPlaceholder}
                aria-invalid={Boolean(errors.email)}
                className={fieldClass('email')}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-[10.5px] tracking-[0.2em] text-ink uppercase"
              >
                {page.subject}
              </label>
              <input
                id="contact-subject"
                type="text"
                value={values.subject}
                onChange={update('subject')}
                placeholder={page.subjectPlaceholder}
                aria-invalid={Boolean(errors.subject)}
                className={fieldClass('subject')}
              />
              {errors.subject && (
                <p className="mt-2 text-xs text-red-600">{errors.subject}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-[10.5px] tracking-[0.2em] text-ink uppercase"
              >
                {page.message}
              </label>
              <textarea
                id="contact-message"
                rows="6"
                value={values.message}
                onChange={update('message')}
                placeholder={page.messagePlaceholder}
                aria-invalid={Boolean(errors.message)}
                className={`${fieldClass('message')} resize-y`}
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-600">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center bg-ink px-7 py-3.5 text-[11px] tracking-[0.22em] text-white uppercase transition-colors hover:bg-graphite"
            >
              {page.submit}
            </button>
          </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
