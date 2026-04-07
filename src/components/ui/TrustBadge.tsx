interface TrustBadgeProps {
  icon: React.ReactNode
  label: string
}

export default function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-warm-gray">{icon}</div>
      <span className="text-[10px] uppercase tracking-[0.12em] text-warm-gray text-center leading-tight">
        {label}
      </span>
    </div>
  )
}

/* ── Badge Icons ─────────────────────────────────────────────── */

export function OrganicIcon() {
  /* TODO: Replace with official Canada Organic logo once certification is obtained */
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="22" cy="22" r="20" />
      <path d="M22 12c-2 4-6 7-6 12 0 4 3 7 6 7s6-3 6-7c0-5-4-8-6-12z" />
      <path d="M22 18v10" />
    </svg>
  )
}

export function BCCertifiedIcon() {
  /* TODO: Replace with official COABC / BC Certified Organic checkmark logo */
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="36" height="28" rx="6" />
      <path d="M15 22l5 5 9-10" />
    </svg>
  )
}

export function FoodSafeIcon() {
  /* TODO: Replace with actual food safety certification badge (HACCP/SQF) */
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 3L4 14v12c0 9 8 14 18 14s18-5 18-14V14L22 3z" />
      <path d="M16 22l4 4 8-8" />
    </svg>
  )
}

export function LocallyGrownIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 40s14-10 14-20a14 14 0 10-28 0c0 10 14 20 14 20z" />
      <circle cx="22" cy="20" r="5" />
    </svg>
  )
}

export function HarvestedFreshIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="22" cy="22" r="18" />
      <path d="M22 10v12l7 4" />
    </svg>
  )
}

export function SustainableIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 30c-3-3-4-7-3-11 4-1 8 0 11 3" />
      <path d="M30 14c3 3 4 7 3 11-4 1-8 0-11-3" />
      <path d="M14 30l16-16" />
    </svg>
  )
}
