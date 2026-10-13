import { stats } from '../data/stats'
import { useLanguage } from '../i18n/LanguageContext'
import Reveal from './Reveal'
import WorldMap from './WorldMap'

export default function GlobalStats() {
  const { t, lang } = useLanguage()

  return (
    <section
      id="dimension"
      aria-labelledby="stats-title"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-mist py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
          <div>
            <Reveal className="mb-10 flex w-full items-center gap-5 lg:mb-12">
              <h2
                id="stats-title"
                className="font-display text-[11px] whitespace-nowrap tracking-[0.28em] text-ink uppercase"
              >
                {t.stats.eyebrow}
              </h2>
              <span className="h-px flex-1 bg-ink/20" aria-hidden="true" />
            </Reveal>

            <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => {
                const content = stat[lang]
                const divider = {
                  1: 'border-l pl-5',
                  3: 'border-l pl-5',
                  2: 'sm:border-l sm:pl-5 xl:border-l xl:pl-5',
                }[index]
                return (
                  <Reveal
                    key={stat.id}
                    delay={0.06 * index}
                    className={`border-ink/15 ${divider ?? ''}`}
                  >
                    <dt className="sr-only">{content.label}</dt>
                    <dd>
                      <span className="block font-display text-4xl leading-none font-bold text-ink xl:text-5xl">
                        {stat.value}
                      </span>
                      <span className="mt-4 block text-[10.5px] tracking-[0.24em] text-ink uppercase">
                        {content.label}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-steel">
                        {content.description}
                      </span>
                    </dd>
                  </Reveal>
                )
              })}
            </dl>
          </div>

          <Reveal delay={0.1} y={18} className="lg:pl-4">
            <WorldMap />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
