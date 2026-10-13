import activity01 from '../assets/images/activity-01.jpg'
import activity02 from '../assets/images/activity-02.jpg'
import activity03 from '../assets/images/activity-03.jpg'

export const activities = [
  {
    id: 'international-relations',
    number: '01',
    image: activity01,
    imageAlt: {
      fr: 'Poignée de main entre deux professionnels en costume',
      en: 'Handshake between two business professionals',
    },
    fr: {
      title: 'INTERNATIONAL\nRELATIONS',
      description:
        'Développement des relations économiques et institutionnelles internationales. Coopération et mise en réseau.',
    },
    en: {
      title: 'INTERNATIONAL\nRELATIONS',
      description:
        'Development of international economic and institutional relations. Cooperation and networking.',
    },
  },
  {
    id: 'investments-advisory',
    number: '02',
    image: activity02,
    imageAlt: {
      fr: 'Globe terrestre posé dans un bureau contemporain haut de gamme',
      en: 'Globe on a desk in a high-end contemporary office',
    },
    fr: {
      title: 'INVESTMENTS\n& ADVISORY',
      description:
        "Conseil stratégique, recherche d'investisseurs, structuration de partenariats et accompagnement des investissements.",
    },
    en: {
      title: 'INVESTMENTS\n& ADVISORY',
      description:
        'Strategic advisory, investor sourcing, structuring of partnerships and support for investments.',
    },
  },
  {
    id: 'major-projects',
    number: '03',
    image: activity03,
    imageAlt: {
      fr: 'Marina internationale avec yachts et gratte-ciel',
      en: 'International marina with yachts and skyscrapers',
    },
    fr: {
      title: 'MAJOR\nPROJECTS',
      description:
        'Promotion et coordination de grands projets structurants : infrastructures, marinas, tourisme, événements internationaux et développement urbain.',
    },
    en: {
      title: 'MAJOR\nPROJECTS',
      description:
        'Promotion and coordination of major structuring projects: infrastructure, marinas, tourism, international events and urban development.',
    },
  },
]
