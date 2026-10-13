import { useLanguage } from '../i18n/LanguageContext'
import PageHero from '../components/PageHero'

export default function Legal() {
  const { t } = useLanguage()
  const page = t.pages.legal

  return (
    <>
      <PageHero title={page.title} lead={page.lead} />
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <p className="text-sm leading-relaxed text-steel">{t.common.comingSoon}</p>
        </div>
      </section>
    </>
  )
}
