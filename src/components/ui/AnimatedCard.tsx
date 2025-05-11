import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

const AnimatedCard = ({ children, className = '' }: AnimatedCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;