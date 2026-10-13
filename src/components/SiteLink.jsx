import { useGoTo } from '../hooks/useGoTo'

// Renders a button styled link that navigates to a route and/or a home section.
export default function SiteLink({
  to = '/',
  section = null,
  onNavigate,
  className,
  children,
  ...rest
}) {
  const goTo = useGoTo()

  const handleClick = (event) => {
    event.preventDefault()
    goTo({ to, section })
    onNavigate?.()
  }

  return (
    <a href={section ? `/#${section}` : to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
