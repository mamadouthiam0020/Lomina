import { projects } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'

export default function ProjectsPage() {
  const { t, lang } = useLanguage()

  return (
    <>
      <PageHero title={t.projects.eyebrow} />
      <section className="bg-ink py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
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
    </>
  )
}
