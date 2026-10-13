import { motion, useReducedMotion } from 'framer-motion'

export default function ProjectCard({ project, lang, index = 0 }) {
  const reduce = useReducedMotion()
  const content = project[lang]

  return (
    <motion.article
      className="group flex flex-col"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.07 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="overflow-hidden bg-graphite">
        <img
          src={project.image}
          alt={project.imageAlt[lang]}
          width="1400"
          height="933"
          loading="lazy"
          decoding="async"
          className="aspect-[3/2] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
      </div>

      <h3 className="mt-6 font-display text-base leading-snug tracking-[0.08em] text-white uppercase sm:text-lg">
        {content.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-white/55">
        {content.description}
      </p>

      <span
        className="mt-5 block h-px w-10 bg-champagne/70 transition-all duration-500 group-hover:w-16"
        aria-hidden="true"
      />
    </motion.article>
  )
}
