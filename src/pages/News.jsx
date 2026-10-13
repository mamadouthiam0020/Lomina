import { useLanguage } from '../i18n/LanguageContext'
import PageHero from '../components/PageHero'

export default function News() {
  const { t } = useLanguage()
  const page = t.pages.news

  return (
    <>
      <PageHero title={page.title} lead={page.lead} />
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="border border-ink/10 px-6 py-16 text-center">
            <p className="text-sm tracking-[0.14em] text-steel uppercase">
              {page.empty}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
