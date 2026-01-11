'use client';

import { useState, useEffect } from 'react';
import { Clock, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Writings', href: '/writings' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        setTime(
          now.toLocaleTimeString('en-US', {
            timeZone: 'America/Los_Angeles',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        );
      } catch (e) {
        console.error('Error formatting time:', e);
        setTime(
          now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 bg-jarvis-dark-600 bg-opacity-80 backdrop-blur-md z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <span
            className="text-xs sm:text-sm text-gray-300 flex items-center flex-shrink-0"
            style={{ whiteSpace: 'nowrap', minWidth: '160px' }}
            title="Current Time in San Francisco, CA"
          >
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-jarvis-blue-500" />
            San Francisco, CA | {time}
          </span>
          <span className="hidden md:inline-flex text-xs sm:text-sm text-gray-300 items-center flex-shrink-0">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
            System Status: Optimal
          </span>
        </div>
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