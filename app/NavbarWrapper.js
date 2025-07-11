'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blogs', label: 'Blog' },
]

export default function NavbarWrapper() {
  const pathname = usePathname()

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#6E1BF5]">
          Mind Stream
        </Link>

        {/* Nav Links */}
        <div className="flex gap-4 flex-wrap justify-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`group relative inline-block px-5 py-2 rounded-full font-medium border-2 border-[#6E1BF5] text-[#6E1BF5] overflow-hidden transition-transform duration-300 hover:scale-105 ${
                pathname === href ? 'bg-[#69F0EF] text-black' : ''
              }`}
            >
              {/* Animated hover fill */}
              <span className="absolute inset-0 bg-[#69F0EF] w-0 group-hover:w-full transition-all duration-700 ease-out z-0 left-0 top-0 rounded-full" />
              <span className="relative z-10 group-hover:text-black">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
