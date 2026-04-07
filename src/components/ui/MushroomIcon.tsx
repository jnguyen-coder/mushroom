interface MushroomIconProps {
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function MushroomIcon({ size = 24, className = '', style }: MushroomIconProps) {
  const height = (size / 24) * 32
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 24 32"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Rounded mushroom cap — slightly asymmetric for organic feel */}
      <path d="M12 2C5.5 2 1 7.2 1.5 12.5C1.8 15.5 4 17 7 17.5C8.5 17.8 10 18 12 18C14 18 15.5 17.8 17 17.5C20 17 22.2 15.5 22.5 12.5C23 7.2 18.5 2 12 2Z" />
      {/* Tapered stem */}
      <path d="M10.2 17.5C10 20 9.8 24 10.5 27C10.8 28.2 11.3 29.5 12 30C12.7 29.5 13.2 28.2 13.5 27C14.2 24 14 20 13.8 17.5C13.2 17.6 12.6 17.7 12 17.7C11.4 17.7 10.8 17.6 10.2 17.5Z" />
    </svg>
  )
}
