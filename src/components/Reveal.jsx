import { motion, useReducedMotion } from 'framer-motion'

// Lightweight scroll reveal: a small vertical offset and a fade-in.
export default function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 26,
  once = true,
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[Tag] ?? motion.div

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
