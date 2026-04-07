import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MushroomIcon from './MushroomIcon'

interface Burst {
  id: number
  x: number
  y: number
}

let burstId = 0

// Fan of 5 mushrooms at different angles, like a hand of cards
const FAN_COUNT = 5
const FAN_SPREAD = 120 // degrees total spread
const FAN_START = -FAN_SPREAD / 2

export default function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([])

  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleClick = useCallback((e: MouseEvent) => {
    if (prefersReduced) return
    // Don't burst on interactive elements (buttons, links, inputs)
    const tag = (e.target as HTMLElement).closest('a, button, input, textarea, select, [role="button"]')
    if (tag) return

    setBursts(prev => [...prev, { id: ++burstId, x: e.clientX, y: e.clientY }])
  }, [prefersReduced])

  const removeBurst = useCallback((id: number) => {
    setBursts(prev => prev.filter(b => b.id !== id))
  }, [])

  useEffect(() => {
    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [handleClick])

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        {bursts.map(burst => (
          <BurstGroup key={burst.id} burst={burst} onComplete={() => removeBurst(burst.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function BurstGroup({ burst, onComplete }: { burst: Burst; onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 900)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <>
      {Array.from({ length: FAN_COUNT }).map((_, i) => {
        const angle = FAN_START + (i / (FAN_COUNT - 1)) * FAN_SPREAD
        const rad = (angle - 90) * (Math.PI / 180) // -90 so 0° = straight up
        const dist = 30 + Math.random() * 20
        const tx = Math.cos(rad) * dist
        const ty = Math.sin(rad) * dist
        const size = 14 + Math.random() * 6

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0.7,
              scale: 0.4,
              x: burst.x - size / 2,
              y: burst.y - size,
              rotate: angle * 0.3,
            }}
            animate={{
              opacity: [0.7, 0.6, 0],
              scale: [0.4, 1, 0.8],
              x: burst.x - size / 2 + tx,
              y: burst.y - size + ty,
              rotate: angle * 0.5,
            }}
            transition={{
              duration: 0.7,
              delay: i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute pointer-events-none"
            style={{ color: '#D4C4B0' }}
          >
            <MushroomIcon size={size} />
          </motion.div>
        )
      })}
    </>
  )
}
