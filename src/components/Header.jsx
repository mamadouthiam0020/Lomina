import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'
import { navItems } from '../data/navigation'
import { useLanguage } from '../i18n/LanguageContext'
import { useGoTo } from '../hooks/useGoTo'
import logoBlanc from '../assets/logos/logo-lomina-blanc.png'
import SearchOverlay from './SearchOverlay'

const SECTION_IDS = ['activities', 'projects']

const ROUTE_KEY_OVERRIDES = { '/projects': 'projects' }

function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function Header() {
  const { t, lang, setLanguage } = useLanguage()
  const goTo = useGoTo()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  const routeKey =
    navItems.find((item) => item.to === location.pathname)?.key ??
    ROUTE_KEY_OVERRIDES[location.pathname]
  const activeKey =
    location.pathname !== '/'
      ? routeKey
      : activeSection ?? 'home'

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNav = (event, item) => {
    event.preventDefault()
    goTo({ to: item.to, section: item.section })
    setMenuOpen(false)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:h-[68px] md:px-8">
          <Link
            to="/"
            aria-label={t.header.logoTitles}
            onClick={(event) => {
              event.preventDefault()
              goTo({ to: '/' })
            }}
            className="flex shrink-0 items-center"
          >
            <img
              src={logoBlanc}
              alt="LOMINA INTERNATIONAL LINKS"
              width="48"
              height="48"
              className="h-12 w-12 object-contain"
            />
          </Link>

          <nav
            aria-label={t.footer.navigation}
            className="hidden flex-1 items-center justify-center gap-x-7 xl:flex"
          >
            {navItems.map((item) => {
              const isActive = activeKey === item.key
              return (
                <a
                  key={item.key}
                  href={item.section ? `/#${item.section}` : item.to}
                  onClick={(event) => handleNav(event, item)}
                  aria-current={isActive ? 'page' : undefined}
                  className="group relative py-2 text-[10.5px] font-light tracking-[0.18em] text-white uppercase transition-colors"
                >
                  {t.nav[item.key]}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px bg-white transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <div
              className="hidden items-center text-[10.5px] tracking-[0.18em] text-white/70 sm:flex"
              role="group"
              aria-label={t.header.language}
            >
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                aria-pressed={lang === 'fr'}
                className={`transition-colors ${
                  lang === 'fr' ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                FR
              </button>
              <span className="mx-2 text-white/30">|</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={lang === 'en'}
                className={`transition-colors ${
                  lang === 'en' ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t.header.search}
              className="text-white/70 transition-colors hover:text-white"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.header.openMenu}
              aria-expanded={menuOpen}
              className="text-white/80 transition-colors hover:text-white xl:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-ink xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-16 items-center justify-between px-5 md:h-[68px] md:px-8">
              <img
                src={logoBlanc}
                alt="LOMINA INTERNATIONAL LINKS"
                width="48"
                height="48"
                className="h-12 w-12 object-contain"
              />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t.header.closeMenu}
                className="text-white/80 transition-colors hover:text-white"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label={t.footer.navigation}
              className="flex flex-col px-5 pt-6 md:px-8"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.section ? `/#${item.section}` : item.to}
                  onClick={(event) => handleNav(event, item)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.04 * index }}
                  className="border-b border-white/10 py-4 font-display text-sm font-light tracking-[0.18em] text-white uppercase"
                >
                  {t.nav[item.key]}
                </motion.a>
              ))}
            </nav>

            <div className="mt-8 flex items-center gap-4 px-5 md:px-8">
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`text-xs tracking-[0.2em] ${
                  lang === 'fr' ? 'text-white' : 'text-white/50'
                }`}
              >
                FR
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`text-xs tracking-[0.2em] ${
                  lang === 'en' ? 'text-white' : 'text-white/50'
                }`}
              >
                EN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
