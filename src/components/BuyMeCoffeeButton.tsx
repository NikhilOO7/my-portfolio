'use client';

import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

interface BuyMeCoffeeButtonProps {
  className?: string;
  variant?: 'default' | 'large' | 'small';
}

export default function BuyMeCoffeeButton({
  className = '',
  variant = 'default'
}: BuyMeCoffeeButtonProps) {
  const handleClick = () => {
    window.open('https://www.buymeacoffee.com/nikhil007', '_blank');
  };

  // Define different styles based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'large':
        return 'py-3 px-6 text-base';
      case 'small':
        return 'py-1 px-3 text-sm';
      default:
        return 'py-2 px-4 text-sm';
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black font-semibold rounded-md 
                 flex items-center justify-center gap-2 transition-all duration-300 
                 shadow-md hover:shadow-lg ${getVariantClasses()} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Coffee className="w-5 h-5" />
      <span>Buy me a coffee</span>
    </motion.button>
  );
}