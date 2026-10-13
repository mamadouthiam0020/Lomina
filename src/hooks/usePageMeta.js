import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seo } from '../data/seo'
import { useLanguage } from '../i18n/LanguageContext'

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

// Keeps the document title and meta description in sync with the current route
// and active language (SPA-friendly SEO).
export function usePageMeta() {
  const { pathname } = useLocation()
  const { lang } = useLanguage()

  useEffect(() => {
    const entry = seo[pathname]?.[lang] ?? seo['/']?.[lang]
    if (!entry) return
    document.title = entry.title
    setMeta('description', entry.description)
    setProperty('og:title', entry.title)
    setProperty('og:description', entry.description)
    setProperty('og:locale', lang === 'fr' ? 'fr_FR' : 'en_US')
  }, [pathname, lang])
}
