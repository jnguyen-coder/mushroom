export default function Footer() {
  return (
    <footer className="bg-text-primary text-warm-gray py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Left */}
        <p>&copy; 2026 Asahi Mushroom</p>

        {/* Center links */}
        <p>
          <a
            href="mailto:hello@asahimushroom.com" /* TODO: Real email */
            className="hover:text-white transition-colors"
          >
            hello@asahimushroom.com
          </a>
          {' \u00B7 '}
          <a
            href="tel:+10000000000" /* TODO: Real phone */
            className="hover:text-white transition-colors"
          >
            (000) 000-0000
          </a>
          {' \u00B7 '}
          <a
            href="https://instagram.com" /* TODO: Real link */
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
        </p>

        {/* Right */}
        <p>Vancouver, BC {/* TODO: Real location */}</p>
      </div>
    </footer>
  );
}
