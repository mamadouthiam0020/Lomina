import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGoTo } from '../hooks/useGoTo'
import heroImage from '../assets/images/hero.jpg'

export default function Hero() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const goTo = useGoTo()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.05 },
    },
  }

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      id="accueil"
      className="relative isolate w-full scroll-mt-16 md:scroll-mt-[68px] overflow-hidden bg-ink"
    >
      <img
        src={heroImage}
        alt={t.hero.imageAlt}
        width="1672"
        height="940"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlays: darker on the left, consistently dark enough for white text. */}
      <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[520px] max-w-[1440px] items-center px-6 py-16 sm:min-h-[560px] lg:min-h-[620px] lg:px-12 xl:min-h-[660px]">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Left column kept empty to preserve the two-column hero layout */}
          <div aria-hidden="true" />

          {/* Right: main content */}
          <motion.div
            className="flex max-w-xl flex-col items-start gap-5 lg:ml-auto lg:gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={item}
              className="text-[10.5px] tracking-[0.3em] text-white/80 uppercase"
            >
              {t.hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-[2rem] leading-[1.06] font-extralight tracking-[0.02em] whitespace-pre-line text-white uppercase sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem]"
            >
              {t.hero.title}
            </motion.h1>

            <motion.button
              variants={item}
              type="button"
              onClick={() => goTo({ to: '/about' })}
              className="group mt-1 inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-[11px] tracking-[0.22em] text-white uppercase ring-1 ring-white/25 transition-colors hover:bg-graphite"
            >
              {t.hero.cta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
