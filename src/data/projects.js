import project01 from '../assets/images/project-01.jpg'
import project02 from '../assets/images/project-02.jpg'
import project03 from '../assets/images/project-03.jpg'
import project04 from '../assets/images/project-04.jpg'

export const projects = [
  {
    id: 'monaco-dakar-race',
    number: '01',
    image: project01,
    imageAlt: {
      fr: 'Voiliers de compétition naviguant en mer à la lumière de fin de journée',
      en: 'Racing sailboats at sea in late-day light',
    },
    fr: {
      title: 'MONACO – DAKAR RACE',
      description: 'Une grande course internationale de voiliers.',
    },
    en: {
      title: 'MONACO – DAKAR RACE',
      description: 'A major international sailing race.',
    },
  },
  {
    id: 'dakar-atlantique-race',
    number: '02',
    image: project02,
    imageAlt: {
      fr: 'Voiliers au large de Dakar avec une ville côtière en arrière-plan',
      en: 'Sailboats off Dakar with a coastal city in the background',
    },
    fr: {
      title: 'DAKAR ATLANTIQUE RACE',
      description: 'Sport, tourisme et coopération internationale.',
    },
    en: {
      title: 'DAKAR ATLANTIQUE RACE',
      description: 'Sport, tourism and international cooperation.',
    },
  },
  {
    id: 'grandes-marinas',
    number: '03',
    image: project03,
    imageAlt: {
      fr: "Marina contemporaine remplie de yachts au coucher du soleil",
      en: 'Contemporary marina filled with yachts at sunset',
    },
    fr: {
      title: 'GRANDES MARINAS',
      description: 'Marinas internationales et économie maritime.',
    },
    en: {
      title: 'GRANDES MARINAS',
      description: 'International marinas and the maritime economy.',
    },
  },
  {
    id: 'infrastructures-villes',
    number: '04',
    image: project04,
    imageAlt: {
      fr: "Ville moderne avec gratte-ciel et front de mer",
      en: 'Modern city with skyscrapers and a waterfront',
    },
    fr: {
      title: 'INFRASTRUCTURES & VILLES',
      description: 'Projets urbains et infrastructures stratégiques.',
    },
    en: {
      title: 'INFRASTRUCTURES & VILLES',
      description: 'Urban projects and strategic infrastructure.',
    },
  },
]
