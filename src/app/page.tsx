// src/app/page.tsx
'use client';

import Button from '@/components/Button';
import EnhancedServicesSection from '@/components/ServicesSection';
import EnhancedFeaturedProjectsSection from '@/components/FeaturedProjectSection';
import BuyMeCoffeeButton from '@/components/BuyMeCoffeeButton';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      setGreeting(
        hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'
      );
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quotes = [
      "Code is like humor: when you have to explain it, it's bad. – Cory House",
      "Programming isn't about what you know; it's about what you can figure out. – Chris Pine",
      "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
      "I'm not a great programmer; I'm just a good programmer with great habits. – Kent Beck",
      "First, solve the problem. Then, write the code. – John Johnson",
      "Debugging is twice as hard as writing the code in the first place. – Brian Kernighan",
      "Talk is cheap. Show me the code. – Linus Torvalds",
      "Code never lies; comments sometimes do. – Ron Jeffries",
      "Programming is the art of doing one thing at a time. – Michael Feathers",
    ];

    setQuote(quotes[0]); // Set initial quote

    const interval = setInterval(() => {
      setQuoteIndex((prev) => {
        const nextIndex = (prev + 1) % quotes.length;
        setQuote(quotes[nextIndex]);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center px-4"
    >
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="pt-24 pb-16"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-jarvis-blue-500 leading-tight"
          >
            Nikhil Bindal
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-200 mt-2"
          >
            Backend Engineer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl mx-auto"
          >
            {greeting} | Crafting intelligent, high-performance applications and exploring the frontiers of AI.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-10 flex justify-center space-x-4 flex-wrap gap-y-4"
          >
            <motion.div
              animate={{ boxShadow: '0 0 10px rgba(25, 118, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.3)' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Link href="/projects">
                <Button variant="primary">Explore Projects</Button>
              </Link>
            </motion.div>
            <motion.div
              animate={{ boxShadow: '0 0 10px rgba(25, 118, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.3)' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Link href="/contact">
                <Button variant="secondary">
                  Hire Me
                </Button>
              </Link>
            </motion.div>
            <motion.div
              animate={{ boxShadow: '0 0 10px rgba(255, 221, 0, 0.3), 0 0 20px rgba(255, 221, 0, 0.3)' }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              <BuyMeCoffeeButton />
            </motion.div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 text-xs sm:text-sm text-gray-400"
          >
            Try: "Show me your skills" or interact with the assistant 💬.
          </motion.p>
          <motion.blockquote
            key={quoteIndex} // Key changes to trigger animation
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-sm sm:text-base text-gray-300 italic max-w-2xl mx-auto"
          >
            "{quote}"
          </motion.blockquote>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: 1.8,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="bottom-8 text-jarvis-blue-500 text-2xl cursor-pointer"
          onClick={scrollToServices}
        >
          ▼
        </motion.div>
      </div>
      
      <div ref={servicesRef}>
        <EnhancedServicesSection />
      </div>
      
      <EnhancedFeaturedProjectsSection />
    </motion.main>
  );
}