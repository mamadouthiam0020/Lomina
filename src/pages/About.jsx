import { useLanguage } from '../i18n/LanguageContext'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

export default function About() {
  const { t } = useLanguage()
  const page = t.pages.about

  return (
    <>
      <PageHero title={page.title} lead={page.lead} />
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-6 lg:px-12">
          {page.body.map((paragraph, index) => (
            <Reveal
              key={index}
              as="p"
              className="text-sm leading-relaxed text-steel sm:text-base"
            >
              {paragraph}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
