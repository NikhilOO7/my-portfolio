'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  // { name: 'Writings', href: '/writings' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-7 left-0 xl:left-14 right-0 bg-jarvis-dark-600/80 backdrop-blur-md z-50 border-b border-jarvis-blue-500/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          {/* Mini arc reactor logo */}
          <span className="relative w-7 h-7 flex items-center justify-center">
            <span
              className="absolute inset-0 rounded-full animate-rotate-slow"
              style={{
                animationDuration: '12s',
                border: '1px dashed rgba(0, 212, 255, 0.5)',
              }}
            />
            <span
              className="absolute inset-1.5 rounded-full"
              style={{
                border: '1px solid rgba(0, 212, 255, 0.6)',
                boxShadow: '0 0 8px rgba(0, 212, 255, 0.45), inset 0 0 6px rgba(0, 212, 255, 0.4)',
              }}
            />
            <span
              className="absolute inset-[10px] rounded-full"
              style={{
                background: 'radial-gradient(circle, #ffffff 0%, #00d4ff 60%, transparent 100%)',
                filter: 'blur(0.5px)',
              }}
            />
          </span>
          <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-jarvis-blue-300 group-hover:text-jarvis-cyan transition-colors uppercase">
            N.BINDAL
          </span>
        </Link>
        <div className="hidden sm:flex sm:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              prefetch={true}
              className={`inline-flex items-center px-1 pt-1 text-sm font-display transition-colors ${
                isActive(item.href)
                  ? 'text-jarvis-blue-500 font-bold'
                  : 'text-white hover:text-jarvis-blue-500 hover:animate-pulse-glow'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-jarvis-blue-500 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="sm:hidden bg-jarvis-dark-600"
          id="mobile-menu"
        >
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`block pl-3 pr-4 py-2 text-base font-display transition-colors ${
                  isActive(item.href)
                    ? 'text-jarvis-blue-500 font-bold bg-jarvis-blue-500/10 border-l-4 border-jarvis-blue-500'
                    : 'text-white hover:text-jarvis-blue-500 hover:bg-jarvis-dark-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}