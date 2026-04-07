import TrustBadge, {
  OrganicIcon,
  BCCertifiedIcon,
  FoodSafeIcon,
  LocallyGrownIcon,
  HarvestedFreshIcon,
  SustainableIcon,
} from '../ui/TrustBadge'
import SocialIcon, { InstagramSVG, FacebookSVG, TikTokSVG } from '../ui/SocialIcon'

const badges = [
  { icon: <OrganicIcon />, label: 'Certified Organic' },
  { icon: <BCCertifiedIcon />, label: 'BC Certified' },
  { icon: <FoodSafeIcon />, label: 'Food Safe' },
  { icon: <LocallyGrownIcon />, label: 'Grown in Vancouver' },
  { icon: <HarvestedFreshIcon />, label: 'Harvested to Order' },
  { icon: <SustainableIcon />, label: 'Sustainably Grown' },
]

export default function Footer() {
  return (
    <footer className="bg-[#2C2824]">
      {/* ── Zone 1: Trust Badges ── */}
      <div className="border-b border-[#8B7D6B]/20">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-6 justify-items-center">
            {badges.map((b) => (
              <TrustBadge key={b.label} icon={b.icon} label={b.label} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Zone 2: Main Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Brand */}
          <div>
            <a href="#" className="flex items-center mb-4">
              <span className="font-logo text-sm font-semibold uppercase tracking-[0.15em] text-[#EDE8E1]">
                ASAHI
              </span>
              <svg viewBox="0 0 32 32" fill="currentColor" className="mx-1.5 h-4 w-4 text-[#8B7D6B]" aria-hidden="true">
                <ellipse cx="16" cy="13" rx="10" ry="8" opacity="0.85" />
                <rect x="13" y="18" width="6" height="9" rx="3" opacity="0.7" />
              </svg>
              <span className="font-logo text-sm font-semibold uppercase tracking-[0.15em] text-[#EDE8E1]">
                MUSHROOM
              </span>
            </a>
            <p className="text-sm text-[#C8C0B8] leading-relaxed max-w-xs">
              Premium gourmet mushrooms grown in small batches in Vancouver, BC. Cultivated with care, delivered fresh to your door.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#EDE8E1] mb-4">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2.5">
              {[
                { label: 'Shop', href: '#shop' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'About', href: '#about' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contact', href: 'mailto:hello@asahimushroom.com' /* TODO: Real email */ },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#C8C0B8] hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact + Social */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#EDE8E1] mb-4">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-[#C8C0B8]">
              <a
                href="mailto:hello@asahimushroom.com" /* TODO: Real email */
                className="hover:text-white transition-colors w-fit"
              >
                hello@asahimushroom.com
              </a>
              <a
                href="tel:+16040000000" /* TODO: Real phone */
                className="hover:text-white transition-colors w-fit"
              >
                (604) 000-0000
              </a>
              <span>Vancouver, BC</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-5">
              <SocialIcon href="https://instagram.com" /* TODO: Real URL */ label="Follow on Instagram">
                <InstagramSVG />
              </SocialIcon>
              <SocialIcon href="https://facebook.com" /* TODO: Real URL */ label="Follow on Facebook">
                <FacebookSVG />
              </SocialIcon>
              <SocialIcon href="https://tiktok.com" /* TODO: Real URL */ label="Follow on TikTok">
                <TikTokSVG />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* ── Zone 3: Legal Bottom Bar ── */}
      <div className="border-t border-[#8B7D6B]/15">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#9B9189]">
          <p>&copy; {new Date().getFullYear()} Asahi Mushroom. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" /* TODO: Privacy policy page */ className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-[#8B7D6B]/40">&middot;</span>
            <a href="#" /* TODO: Terms page */ className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
