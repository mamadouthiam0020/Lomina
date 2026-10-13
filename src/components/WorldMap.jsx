import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import worldMap from '../assets/images/world-map.jpg'

const NODES = [
  { x: 168, y: 168 },
  { x: 330, y: 120 },
  { x: 505, y: 150 },
  { x: 648, y: 132 },
  { x: 786, y: 196 },
  { x: 236, y: 330 },
  { x: 520, y: 322 },
  { x: 700, y: 316 },
  { x: 858, y: 268 },
]

const LINKS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 6],
  [6, 7],
  [7, 8],
  [0, 5],
  [5, 6],
  [6, 4],
]

function arc(a, b) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dist = Math.hypot(dx, dy)
  const curve = Math.min(dist * 0.28, 90)
  const nx = -dy / (dist || 1)
  const ny = dx / (dist || 1)
  const cx = mx + nx * curve
  const cy = my + ny * curve - 24
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`
}

export default function WorldMap() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  return (
    <div className="relative w-full">
      <div className="relative aspect-[16/10] w-full">
        <img
          src={worldMap}
          alt={t.stats.mapAlt}
          width="1400"
          height="875"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center grayscale contrast-[1.12] brightness-[0.42]"
          style={{
            maskImage:
              'radial-gradient(ellipse 78% 72% at 50% 50%, #000 52%, transparent 82%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 78% 72% at 50% 50%, #000 52%, transparent 82%)',
          }}
        />

        <svg
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c9aa78" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#c9aa78" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#c9aa78" stopOpacity="0" />
            </radialGradient>
          </defs>

          {LINKS.map(([from, to]) => (
            <path
              key={`link-${from}-${to}`}
              d={arc(NODES[from], NODES[to])}
              fill="none"
              stroke="#c9aa78"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
          ))}

          {NODES.map((node, index) => (
            <g key={`node-${index}`}>
              <circle cx={node.x} cy={node.y} r="18" fill="url(#nodeGlow)" />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="3.4"
                fill="#f4e9d6"
                initial={reduce ? false : { opacity: 0.55 }}
                animate={reduce ? false : { opacity: [0.55, 1, 0.55] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (index % 4) * 0.5,
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
