import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Mail, MapPin, Phone, User } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { contact } from '../data/contact'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DETAILS = [
  { key: 'ceo', icon: User },
  { key: 'phone', icon: Phone },
  { key: 'email', icon: Mail },
  { key: 'address', icon: MapPin },
]

function DetailItem({ page, item }) {
  const Icon = item.icon

  const label = {
    ceo: page.ceoLabel,
    phone: page.phoneLabel,
    email: page.emailLabel,
    address: page.addressLabel,
  }[item.key]

  return (
    <div className="group flex items-start gap-5 py-5">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/12 text-champagne transition-colors duration-500 group-hover:border-champagne/60 group-hover:bg-champagne/10"
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-[10px] tracking-[0.22em] text-steel uppercase">
          {label}
        </dt>
        <dd className="mt-1.5 text-sm text-ink">
          {item.key === 'phone' && (
            <a
              href={`tel:${contact.phoneHref}`}
              className="underline decoration-champagne/0 underline-offset-4 transition-colors duration-300 hover:text-champagne hover:decoration-champagne/60"
            >
              {contact.phoneDisplay}
            </a>
          )}
          {item.key === 'email' && (
            <a
              href={`mailto:${contact.email}`}
              className="break-all underline decoration-champagne/0 underline-offset-4 transition-colors duration-300 hover:text-champagne hover:decoration-champagne/60"
            >
              {contact.email}
            </a>
          )}
          {item.key === 'ceo' && contact.ceoName}
          {item.key === 'address' && contact.address}
        </dd>
      </div>
    </div>
  )
}

function SectionRule({ id, title }) {
  return (
    <div className="flex items-center gap-5">
      <h2
        id={id}
        className="font-display text-[11px] tracking-[0.28em] text-ink uppercase"
      >
        {title}
      </h2>
      <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
    </div>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const page = t.pages.contact
  const reduce = useReducedMotion()
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
    `w-full border bg-white px-4 py-3.5 text-sm text-ink transition-colors duration-300 placeholder:text-steel/50 focus:outline-none ${
      errors[field]
        ? 'border-red-500/70'
        : 'border-ink/12 focus:border-champagne focus:ring-1 focus:ring-champagne/30'
    }`

  const labelClass =
    'mb-2.5 block text-[10px] tracking-[0.22em] text-steel uppercase'

  return (
    <>
      <PageHero title={page.title} lead={page.lead} />
      <section className="bg-mist py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <aside aria-labelledby="contact-details-title">
              <Reveal>
                <SectionRule
                  id="contact-details-title"
                  title={page.detailsTitle}
                />
              </Reveal>
              <Reveal as="dl" delay={0.08} className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                {DETAILS.map((item) => (
                  <DetailItem key={item.key} page={page} item={item} />
                ))}
              </Reveal>
            </aside>

            <Reveal
              delay={0.12}
              className="relative border border-ink/10 bg-paper p-7 shadow-[0_30px_80px_-50px_rgba(5,6,6,0.35)] sm:p-10 lg:p-12"
            >
              <span
                className="absolute -top-px left-10 h-px w-14 bg-champagne"
                aria-hidden="true"
              />
              <span
                className="absolute -bottom-px right-10 h-px w-14 bg-champagne"
                aria-hidden="true"
              />

              <SectionRule title={page.formTitle} />

              <AnimatePresence initial={false} mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    role="status"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 flex items-start gap-4 border border-champagne/40 bg-champagne/10 px-6 py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-champagne/50 text-champagne"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm leading-relaxed text-ink">
                        {page.success}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-[0.22em] text-steel uppercase underline-offset-4 transition-colors hover:text-ink hover:underline"
                      >
                        {page.again}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 grid gap-6 sm:grid-cols-2"
                  >
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
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
                      <label htmlFor="contact-email" className={labelClass}>
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

                    <div className="sm:col-span-2">
                      <label htmlFor="contact-subject" className={labelClass}>
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
                        <p className="mt-2 text-xs text-red-600">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="contact-message" className={labelClass}>
                        {page.message}
                      </label>
                      <textarea
                        id="contact-message"
                        rows="6"
                        value={values.message}
                        onChange={update('message')}
                        placeholder={page.messagePlaceholder}
                        aria-invalid={Boolean(errors.message)}
                        className={`${fieldClass('message')} min-h-[150px] resize-y`}
                      />
                      {errors.message && (
                        <p className="mt-2 text-xs text-red-600">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="group inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 text-[11px] tracking-[0.22em] text-white uppercase transition-colors hover:bg-graphite sm:w-auto"
                      >
                        {page.submit}
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
