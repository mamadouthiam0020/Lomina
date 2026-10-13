# LOMINA INTERNATIONAL LINKS

Site vitrine institutionnel de **LOMINA INTERNATIONAL LINKS** — relations économiques internationales, investissements et grands projets.

Application web **mono-page + pages dédiées**, bilingue (FR/EN), à l'esthétique premium : fond sombre, typographie fine, accents champagne.

## Fonctionnalités

- **Hero** immersive avec image plein écran et animations d'entrée.
- **Nos activités** et **Nos projets** en sections sur l'accueil, avec pages dédiées.
- **Une dimension mondiale** : planisphère des connexions internationales et chiffres clés.
- **Navigation intelligente** : ancres sur l'accueil, pages dédiées, surlignage de la section active au scroll.
- **Bilingue FR / EN** commutable à tout moment, persistée dans le navigateur et répercutée sur `<html lang>`.
- **Recherche** globale (activités, projets, pages).
- **Page Contact** : coordonnées officielles + formulaire (validation côté client).
- **Bouton WhatsApp** flottant.
- **SEO** : titre et meta description par route et par langue.
- Accessibilité : navigation clavier, focus visibles, `prefers-reduced-motion`, alternatives `alt`.

## Stack technique

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (SPA)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/) (icônes)
- [Oxlint](https://oxc.rs/) (lint)

## Démarrage

```bash
npm install      # installe les dépendances
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build
npm run lint     # analyse statique
```

## Structure du projet

```
src/
├── assets/            # logos officiels et images
├── components/        # composants réutilisables (Header, Hero, Footer, WhatsAppButton, ...)
├── data/              # données du site (navigation, activités, projets, stats, seo, contact)
├── hooks/             # hooks maison (useGoTo, usePageMeta)
├── i18n/              # traductions FR/EN et contexte de langue
├── pages/             # pages routées (Home, About, ProjectsPage, Partners, News, Contact, ...)
├── App.jsx            # routage et mise en page globale
└── index.css          # thème Tailwind (@theme) et styles de base
```

### Routes

| Route | Contenu |
| --- | --- |
| `/` | Accueil (Hero, Activités, Projets, Dimension mondiale) |
| `/about` | Qui sommes-nous |
| `/projects` | Projets en développement |
| `/partners` | Partenaires |
| `/news` | Actualités |
| `/contact` | Coordonnées + formulaire |
| `/legal` | Mentions légales |
| `/privacy` | Politique de confidentialité |
| `*` | Page 404 |

## Déploiement (Render)

Le fichier [`render.yaml`](./render.yaml) décrit le déploiement en **Static Site** (CDN, gratuit) avec le *rewrite* SPA nécessaire à React Router.

### Option A — Blueprint (recommandé)

1. Sur [Render Dashboard](https://dashboard.render.com/) : **New > Blueprint**.
2. Sélectionnez le dépôt `mamadouthiam0020/Lomina` et la branche `main`.
3. Render lit `render.yaml` et crée le site. Validez.

### Option B — Manuel

**New > Static Site**, puis :

| Champ | Valeur |
| --- | --- |
| Branch | `main` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

Puis dans l'onglet **Redirects/Rewrites**, ajoutez une règle :
Source `/*` → Destination `/index.html` → Action **Rewrite** (indispensable au routage côté client).

Le site est ensuite republié automatiquement à chaque `git push` sur `main`.

## Contact

**Mme Amar Amina** — CEO
- Téléphone : [00221776116308](tel:+221776116308)
- E-mail : [Lomeaminata@hotmail.com](mailto:Lomeaminata@hotmail.com)
- Siège : NGOR ALMADIES, immeuble KUBRRA
