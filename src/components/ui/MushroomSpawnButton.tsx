import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MushroomIcon from './MushroomIcon'

interface Spawn {
  id: number
  x: number
  rotate: number
  size: number
}

const SPAWN_INTERVAL = 350
const MAX_SPAWNS = 12
const LIFECYCLE_MS = 4000

let spawnCounter = 0

// Pick a random unoccupied slot
function randomSlotX(existing: number[]): number {
  const slots = [6, 16, 26, 36, 46, 56, 66, 76, 86, 94]
  // Shuffle slots randomly
  const shuffled = [...slots].sort(() => Math.random() - 0.5)
  for (const slot of shuffled) {
    if (!existing.some(ex => Math.abs(ex - slot) < 8)) return slot
  }
  return 5 + Math.random() * 90
}

export default function MushroomSpawnButton({ children }: { children: React.ReactNode }) {
  const [spawns, setSpawns] = useState<Spawn[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const spawnOne = useCallback(() => {
    setSpawns(prev => {
      if (prev.length >= MAX_SPAWNS) return prev
      const existingXs = prev.map(s => s.x)
      return [...prev, {
        id: ++spawnCounter,
        x: randomSlotX(existingXs),
        rotate: -6 + Math.random() * 12,
        size: 28 + Math.random() * 14,
      }]
    })
  }, [])

  const removeSpawn = useCallback((id: number) => {
    setSpawns(prev => prev.filter(s => s.id !== id))
  }, [])

  const handleEnter = useCallback(() => {
    if (prefersReduced || intervalRef.current) return
    spawnOne()
    intervalRef.current = setInterval(spawnOne, SPAWN_INTERVAL)
  }, [spawnOne, prefersReduced])

  const handleLeave = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative inline-flex rounded-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ clipPath: 'inset(0 round 9999px)' }}
    >
      {children}

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <AnimatePresence>
          {spawns.map(spawn => (
            <SpawnedMushroom
              key={spawn.id}
              spawn={spawn}
              onComplete={() => removeSpawn(spawn.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SpawnedMushroom({
  spawn,
  onComplete,
}: {
  spawn: Spawn
  onComplete: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onComplete, LIFECYCLE_MS)
    return () => clearTimeout(t)
  }, [onComplete])

  // Mushroom grows FROM the bottom edge, stays rooted there.
  // No upward drift — they sit on the ground like real mushrooms.
  //
  // Phase 1: GROW (0→20%) — scale from tiny to full, fade in
  // Phase 2: STAY (20→70%) — fully grown, visible, grounded
  // Phase 3: FADE (70→100%) — slowly disappear

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.1,
        rotate: spawn.rotate,
      }}
      animate={{
        opacity: [0, 0.5, 0.5, 0.5, 0.5, 0],
        scale:  [0.1, 0.8, 1.0, 1.0, 1.0, 0.95],
        rotate: spawn.rotate,
      }}
      transition={{
        duration: LIFECYCLE_MS / 1000,
        times: [0, 0.2, 0.35, 0.55, 0.7, 1],
        ease: 'easeOut',
      }}
      className="absolute pointer-events-none"
      style={{
        left: `${spawn.x}%`,
        bottom: 0,
        transformOrigin: 'bottom center',
        color: 'rgba(212, 196, 176, 0.8)',
      }}
    >
      <MushroomIcon size={spawn.size} />
    </motion.div>
  )
}
