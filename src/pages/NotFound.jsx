import { useLanguage } from '../i18n/LanguageContext'
import SiteLink from '../components/SiteLink'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <section className="flex min-h-[60vh] items-center bg-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-24 text-center lg:px-12">
        <h1 className="font-display text-5xl font-light tracking-[0.2em] text-white/30">
          404
        </h1>
        <p className="mt-6 text-sm tracking-[0.14em] text-white/60 uppercase">
          {t.common.notFound}
        </p>
        <SiteLink
          to="/"
          className="mt-8 inline-flex bg-white px-7 py-3.5 text-[11px] tracking-[0.22em] text-ink uppercase transition-colors hover:bg-white/90"
        >
          {t.common.backHome}
        </SiteLink>
      </div>
    </section>
  )
}
