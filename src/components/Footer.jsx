import { navItems } from '../data/navigation'
import { contact } from '../data/contact'
import { useLanguage } from '../i18n/LanguageContext'
import SiteLink from './SiteLink'
import logoBlanc from '../assets/logos/logo-lomina-blanc.png'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12 lg:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <img
              src={logoBlanc}
              alt="Lomina Group — LOMINA INTERNATIONAL LINKS"
              width="64"
              height="64"
              className="h-16 w-16 object-contain"
            />
            <p className="font-display text-sm tracking-[0.18em] text-white uppercase">
              Lomina Group
              <span className="mt-1 block text-[10px] tracking-[0.24em] text-white/55">
                LOMINA INTERNATIONAL LINKS
              </span>
            </p>
            <address className="flex flex-col gap-2 text-xs tracking-[0.06em] text-white/70 not-italic">
              <span>
                <span className="text-white">{contact.ceoName}</span>
                {' · '}
                {contact.ceoRole}
              </span>
              <a
                href={`tel:${contact.phoneHref}`}
                className="transition-colors hover:text-white"
              >
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="break-all transition-colors hover:text-white"
              >
                {contact.email}
              </a>
              <span>{contact.address}</span>
            </address>
          </div>

          <nav aria-label={t.footer.navigation}>
            <h2 className="font-display text-[10.5px] tracking-[0.28em] text-white/45 uppercase">
              {t.footer.navigation}
            </h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <SiteLink
                    to={item.to}
                    section={item.section}
                    className="text-xs tracking-[0.12em] text-white uppercase transition-colors hover:text-white"
                  >
                    {t.nav[item.key]}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.information}>
            <h2 className="font-display text-[10.5px] tracking-[0.28em] text-white/45 uppercase">
              {t.footer.information}
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <SiteLink
                  to="/legal"
                  className="text-xs tracking-[0.12em] text-white uppercase transition-colors hover:text-white"
                >
                  {t.footer.legal}
                </SiteLink>
              </li>
              <li>
                <SiteLink
                  to="/privacy"
                  className="text-xs tracking-[0.12em] text-white uppercase transition-colors hover:text-white"
                >
                  {t.footer.privacy}
                </SiteLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] tracking-[0.18em] text-white/45 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} Lomina Group — LOMINA INTERNATIONAL LINKS. {t.footer.rights}</p>
          <p>{t.hero.signature}</p>
        </div>
      </div>
    </footer>
  )
}
