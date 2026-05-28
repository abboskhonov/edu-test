import { Link } from "@tanstack/react-router"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`flex shrink-0 items-center gap-2.5 rounded-full transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${className}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="12" fill="white" />
        <path
          d="M12 5L13.5 9.5H18.5L14.5 12.5L16 17L12 14L8 17L9.5 12.5L5.5 9.5H10.5L12 5Z"
          fill="url(#logo-star)"
        />
        <defs>
          <linearGradient id="logo-star" x1="5.5" y1="5" x2="18.5" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0D9488" />
            <stop offset="1" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-sm font-bold tracking-tight text-background md:text-base">
        edufy
      </span>
    </Link>
  )
}
