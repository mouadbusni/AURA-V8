import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeInOnScrollProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const FadeInOnScroll = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '' 
}: FadeInOnScrollProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const directionVariants = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: -40, opacity: 0 },
    right: { x: 40, opacity: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;