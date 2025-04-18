'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
  { name: 'Writings', href: '/writings' },
];

interface NavBarProps {
  className?: string;
}

export default function NavBar({ className }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between sm:justify-end space-x-8 fixed top-16 left-0 right-0 bg-jarvis-dark-600 bg-opacity-80 backdrop-blur-md px-4 sm:px-6 h-16 shadow-lg ${className || ''}`}
    >
      <div className="hidden sm:flex sm:space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            prefetch={true}
            className="inline-flex items-center px-1 pt-1 text-sm font-display text-white hover:text-jarvis-blue-500 hover:animate-pulse-glow"
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
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="absolute top-16 left-0 right-0 bg-jarvis-dark-600 sm:hidden"
          id="mobile-menu"
        >
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className="block pl-3 pr-4 py-2 text-base font-display text-white hover:text-jarvis-blue-500 hover:bg-jarvis-dark-400"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}