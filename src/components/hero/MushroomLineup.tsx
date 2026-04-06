'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const mushrooms = [
  { src: '/images/mushrooms/hero/oyster.png', alt: 'Oyster mushroom', width: 140, height: 120, offsetY: 10 },
  { src: '/images/mushrooms/hero/button.png', alt: 'Button mushroom', width: 90, height: 80, offsetY: 25 },
  { src: '/images/mushrooms/hero/bunapi.png', alt: 'Bunapi mushroom', width: 110, height: 150, offsetY: -5 },
  { src: '/images/mushrooms/hero/shiitake1.png', alt: 'Shiitake mushroom', width: 100, height: 90, offsetY: 20 },
  { src: '/images/mushrooms/hero/shiitake2.png', alt: 'Shiitake mushroom', width: 95, height: 85, offsetY: 22 },
  { src: '/images/mushrooms/hero/king-oyster1.png', alt: 'King Oyster mushroom', width: 100, height: 170, offsetY: -15 },
  { src: '/images/mushrooms/hero/king-oyster2.png', alt: 'King Oyster mushroom', width: 95, height: 165, offsetY: -12 },
  { src: '/images/mushrooms/hero/pioppino.png', alt: 'Pioppino mushroom', width: 110, height: 120, offsetY: 8 },
  { src: '/images/mushrooms/hero/enoki.png', alt: 'Enoki mushroom', width: 90, height: 160, offsetY: -10 },
];

interface MushroomLineupProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

function MushroomItem({
  mushroom,
  index,
  hasLoaded,
  scrollYProgress,
}: {
  mushroom: (typeof mushrooms)[number];
  index: number;
  hasLoaded: boolean;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const reverseIndex = 8 - index;
  const startThreshold = 0.4 + reverseIndex * 0.04;
  const endThreshold = startThreshold + 0.25;

  const y = useTransform(scrollYProgress, [startThreshold, endThreshold], [0, 50]);
  const opacity = useTransform(scrollYProgress, [startThreshold, endThreshold], [1, 0]);
  const scale = useTransform(scrollYProgress, [startThreshold, endThreshold], [1, 0.9]);

  const mobileScale = 0.55;

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className={`relative flex-shrink-0 ${index >= 6 ? 'hidden sm:block' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        animate={
          hasLoaded
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 60, scale: 0.85 }
        }
        transition={{
          duration: 0.6,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ marginBottom: mushroom.offsetY }}
      >
        <img
          src={mushroom.src}
          alt={mushroom.alt}
          width={mushroom.width}
          height={mushroom.height}
          className="select-none w-[--w-mobile] h-[--h-mobile] md:w-[--w-desktop] md:h-[--h-desktop]"
          style={
            {
              '--w-mobile': `${Math.round(mushroom.width * mobileScale)}px`,
              '--h-mobile': `${Math.round(mushroom.height * mobileScale)}px`,
              '--w-desktop': `${mushroom.width}px`,
              '--h-desktop': `${mushroom.height}px`,
            } as React.CSSProperties
          }
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

function MushroomLineup({ containerRef }: MushroomLineupProps) {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none">
      <div className="flex items-end justify-center -space-x-2">
        {mushrooms.map((mushroom, index) => (
          <MushroomItem
            key={mushroom.src}
            mushroom={mushroom}
            index={index}
            hasLoaded={hasLoaded}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

export default MushroomLineup;
