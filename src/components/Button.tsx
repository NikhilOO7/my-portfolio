'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-display transition-colors focus:outline-none focus:ring-2 focus:ring-jarvis-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-jarvis-blue-500 text-white hover:bg-jarvis-blue-600 animate-pulse-glow',
        secondary: 'bg-jarvis-accent-500 text-jarvis-dark-900 hover:bg-jarvis-accent-400',
        outline: 'border border-jarvis-blue-500 text-jarvis-blue-500 hover:bg-jarvis-blue-500 hover:text-white hover:animate-pulse-glow',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isHireMe?: boolean;
}

// Create a motion-enabled Button using motion.create() with correct button type
const MotionButton = motion.create<ButtonProps & HTMLMotionProps<'button'>>((props) => {
  const { className, variant, size, isHireMe, ...rest } = props;
  const baseClassName = buttonVariants({ variant, size, className }) || '';
  const hireMeClass = isHireMe ? ' animate-pulse-glow' : '';
  const finalClassName = `${baseClassName}${hireMeClass}`.trim();

  return (
    <button
      className={finalClassName}
      {...rest}
    />
  );
});

export default MotionButton;