'use client';

import { motion } from 'framer-motion';
import Button from './Button';

interface FloatingHireMeButtonProps {
  disableAnimation?: boolean;
}

export default function FloatingHireMeButton({ disableAnimation = false }: FloatingHireMeButtonProps) {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={!disableAnimation ? { boxShadow: '0 0 10px rgba(25, 118, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.3)' } : {}}
        transition={!disableAnimation ? { duration: 2, repeat: Infinity, repeatType: 'reverse' } : {}}
      >
        <Button
          className="btn-secondary"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 12px rgba(25, 118, 255, 0.5), 0 0 24px rgba(0, 212, 255, 0.3)',
            backgroundColor: '#00b7eb',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/contact'}
        >
          Hire Me
        </Button>
      </motion.div>
    </motion.div>
  );
}