import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import SiteLink from './SiteLink'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'

export default function Projects() {
  const { t, lang } = useLanguage()

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-16 md:scroll-mt-[68px] bg-ink py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal className="mb-12 flex flex-col gap-5 sm:mb-16 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-5 sm:max-w-md">
            <h2
              id="projects-title"
              className="font-display text-[11px] whitespace-nowrap tracking-[0.28em] text-white uppercase"
            >
              {t.projects.eyebrow}
            </h2>
            <span className="hidden h-px flex-1 bg-white/25 sm:block" aria-hidden="true" />
          </div>

          <SiteLink
            to="/projects"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white"
          >
            {t.projects.viewAll}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </SiteLink>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
