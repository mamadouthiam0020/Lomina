import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SiteLink from './SiteLink'

export default function ActivityCard({ activity, lang, learnMore, index = 0 }) {
  const reduce = useReducedMotion()
  const content = activity[lang]

  return (
    <motion.article
      className="group flex flex-col"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="overflow-hidden bg-mist">
        <img
          src={activity.image}
          alt={activity.imageAlt[lang]}
          width="1400"
          height="1050"
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-6 flex items-start gap-4">
        <span className="font-display text-sm font-light text-[#bfbfba]">
          {activity.number}
        </span>
        <h3 className="font-display text-lg leading-tight tracking-[0.08em] whitespace-pre-line text-ink uppercase sm:text-xl">
          {content.title}
        </h3>
      </div>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-steel">
        {content.description}
      </p>

      <SiteLink
        to="/about"
        className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-ink uppercase transition-colors hover:text-steel"
      >
        {learnMore}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </SiteLink>
    </motion.article>
  )
}
