import { activities } from '../data/activities'
import { useLanguage } from '../i18n/LanguageContext'
import ActivityCard from './ActivityCard'
import Reveal from './Reveal'

export default function Activities() {
  const { t, lang } = useLanguage()

  return (
    <section
      id="activities"
      aria-labelledby="activities-title"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-paper py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal className="mb-12 flex items-center gap-5 lg:mb-16">
          <h2
            id="activities-title"
            className="font-display text-[11px] tracking-[0.28em] text-ink uppercase"
          >
            {t.activities.eyebrow}
          </h2>
          <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-14">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              lang={lang}
              learnMore={t.activities.learnMore}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
