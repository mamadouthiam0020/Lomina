import { motion, useReducedMotion } from 'framer-motion'

export default function PageHero({ title, lead }) {
  const reduce = useReducedMotion()

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:py-20 lg:px-12 lg:py-24">
        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl font-extralight tracking-[0.12em] text-white uppercase sm:text-3xl lg:text-4xl"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  )
}
