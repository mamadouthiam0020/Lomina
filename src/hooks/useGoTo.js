import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Navigate to a route, or to an in-page section on the home page.
export function useGoTo() {
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    ({ to = '/', section = null }) => {
      const scrollToSection = () => {
        if (section) {
          const el = document.getElementById(section)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      if (location.pathname !== to) {
        navigate(to)
        requestAnimationFrame(() => {
          window.setTimeout(scrollToSection, 80)
        })
      } else {
        scrollToSection()
      }
    },
    [navigate, location.pathname],
  )
}
