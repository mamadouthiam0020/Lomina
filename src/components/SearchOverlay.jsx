import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X, CornerDownLeft } from 'lucide-react'
import { activities } from '../data/activities'
import { projects } from '../data/projects'
import { useLanguage } from '../i18n/LanguageContext'
import { useGoTo } from '../hooks/useGoTo'

function buildIndex(t, lang) {
  const items = []

  activities.forEach((activity) => {
    items.push({
      id: `activity-${activity.id}`,
      kind: t.search.sectionActivities,
      title: activity[lang].title.replace(/\n/g, ' '),
      description: activity[lang].description,
      to: '/',
      section: 'activities',
    })
  })

  projects.forEach((project) => {
    items.push({
      id: `project-${project.id}`,
      kind: t.search.sectionProjects,
      title: project[lang].title,
      description: project[lang].description,
      to: '/',
      section: 'projects',
    })
  })

  ;[
    ['about', '/about'],
    ['partners', '/partners'],
    ['news', '/news'],
    ['contact', '/contact'],
    ['legal', '/legal'],
    ['privacy', '/privacy'],
  ].forEach(([key, to]) => {
    items.push({
      id: `page-${key}`,
      kind: t.search.sectionPages,
      title: t.pages[key].title,
      description: t.pages[key].lead,
      to,
      section: null,
    })
  })

  return items
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function SearchOverlay({ open, onClose }) {
  const { t, lang } = useLanguage()
  const goTo = useGoTo()
  const [query, setQuery] = useState('')
  const [prevOpen, setPrevOpen] = useState(open)
  const inputRef = useRef(null)

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) setQuery('')
  }

  const index = useMemo(() => buildIndex(t, lang), [t, lang])

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return []
    return index.filter((item) =>
      normalize(`${item.title} ${item.description} ${item.kind}`).includes(q),
    )
  }, [index, query])

  useEffect(() => {
    if (!open) return undefined
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const select = (item) => {
    goTo({ to: item.to, section: item.section })
    onClose()
  }

  const onInputKeyDown = (event) => {
    if (event.key === 'Enter' && results[0]) {
      select(results[0])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/80 px-4 pt-24 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t.search.placeholder}
        >
          <motion.div
            className="w-full max-w-2xl border border-white/15 bg-graphite"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search className="h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={t.search.placeholder}
                aria-label={t.search.placeholder}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label={t.search.close}
                className="shrink-0 text-white/50 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto px-2 py-2">
              {!query.trim() && (
                <p className="px-3 py-6 text-center text-xs tracking-[0.15em] text-white/40 uppercase">
                  {t.search.hint}
                </p>
              )}

              {query.trim() && results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-white/50">
                  {t.search.noResults}
                </p>
              )}

              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => select(item)}
                  className="group flex w-full items-start justify-between gap-4 px-3 py-3 text-left transition-colors hover:bg-white/5"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] tracking-[0.2em] text-champagne uppercase">
                      {item.kind}
                    </span>
                    <span className="mt-1 block truncate text-sm text-white">
                      {item.title}
                    </span>
                  </span>
                  <CornerDownLeft
                    className="mt-1 h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/70"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
